#!/usr/bin/env python3
"""Deploy the development preview to an exe.dev VM over the exe.dev HTTPS API (no SSH needed).

exe.dev is the development environment and can be deployed from any branch. Production is
GitHub Pages, published from main by .github/workflows/pages.yml. Preview builds are marked
with a "preview" badge, noindex and a robots.txt that disallows crawling.

Uploads the source (not node_modules/dist) as a tarball, then runs deploy/vm-setup.sh on the VM,
which installs Node, builds organism mode (/) and nerd mode (/nerd/) from the committed content, and
serves them with nginx on :8000. There is no scheduled rebuild.

Auth (pick one):
  EXE_TOKEN=exe0.…            a token whose cmds include "ssh <vm>"
  EXE_TOKEN_SIGNER=/path.py   a script that prints a token for a permissions JSON argv[1]
                              (see https://exe.dev/docs/https-api-local-key)
Usage:  python3 deploy/deploy-exe.py [--vm sovereignagents] [--create] [--public] [--rebuild-only]
"""
import argparse, base64, io, json, os, re, subprocess, sys, tarfile, time, urllib.request, urllib.error
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = {"node_modules", "dist", "content-src", "releases", "current", ".astro", ".git"}

def token(cmds):
    if os.environ.get("EXE_TOKEN"):
        return os.environ["EXE_TOKEN"]
    signer = os.environ.get("EXE_TOKEN_SIGNER")
    if not signer:
        sys.exit("set EXE_TOKEN or EXE_TOKEN_SIGNER")
    perm = json.dumps({"exp": int(time.time()) + 1800, "cmds": cmds}, separators=(",", ":"))
    return subprocess.check_output(["python3", signer, perm]).decode().strip()

def call(tok, body, timeout=900):
    req = urllib.request.Request("https://exe.dev/exec", data=body.encode(), method="POST", headers={"Authorization": f"Bearer {tok}"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode()
    except urllib.error.HTTPError as e:
        sys.exit(f"exe.dev {e.code}: {e.read().decode()[:400]}")

def tarball():
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as t:
        for dp, dns, fns in os.walk(ROOT):
            dns[:] = [d for d in dns if d not in SKIP]
            for f in fns:
                p = os.path.join(dp, f)
                t.add(p, arcname=os.path.relpath(p, ROOT))
    return buf.getvalue()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vm", default="sovereignagents")
    ap.add_argument("--create", action="store_true", help="create the VM first")
    ap.add_argument("--public", action="store_true", help="make https://<vm>.exe.xyz public")
    ap.add_argument("--rebuild-only", action="store_true", help="rebuild the uploaded source on the VM")
    a = ap.parse_args()
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,62}", a.vm):
        sys.exit(f"invalid VM name: {a.vm!r}")  # it is interpolated into remote commands
    vm, app = a.vm, "/home/exedev/sovereignagents-site"
    tok = token(["new", "share port", "share set-public", "share show", f"ssh {a.vm}"])
    if a.create:
        print(call(tok, f"new --name={vm}"))
    sh = lambda cmd, timeout=900: call(tok, f"ssh {vm} {json.dumps(cmd)}", timeout)
    if a.rebuild_only:
        print(sh(f"cd {app} && bash deploy/rebuild.sh")); return
    data = base64.b64encode(tarball()).decode()
    chunks = [data[i:i + 60000] for i in range(0, len(data), 60000)]
    sh("rm -f /tmp/site.tgz.b64", 60)
    for i, c in enumerate(chunks):
        sh(f"echo {c} {'>' if i == 0 else '>>'} /tmp/site.tgz.b64", 120)
    print(f"uploaded {len(chunks)} chunks")
    sh(f"mkdir -p {app} && base64 -d /tmp/site.tgz.b64 > /tmp/site.tgz && gzip -t /tmp/site.tgz && find {app} -mindepth 1 -maxdepth 1 ! -name node_modules ! -name releases ! -name current ! -name .rebuild.lock -exec rm -rf {{}} + && tar xzf /tmp/site.tgz -C {app} && rm /tmp/site.tgz && rm /tmp/site.tgz.b64 && (nohup bash {app}/deploy/vm-setup.sh > /tmp/sa-setup.log 2>&1 &)")
    for _ in range(90):  # poll up to ~15 min
        time.sleep(10)
        log = sh("tail -5 /tmp/sa-setup.log", 60)
        if "[setup] done" in log or "[setup] failed" in log:
            break
    print(log)
    print(call(tok, f"share port {vm} 8000"))
    if a.public:
        print(call(tok, f"share set-public {vm}"))
    print(f"https://{vm}.exe.xyz/")

if __name__ == "__main__":
    main()
