// Schema for the curated, editor-owned content layer in /content.
// Every entry carries sources and a `verified` (or `assessed`) date. Builds fail if a field is missing.
import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const date = z.coerce.date();
const source = z.object({ title: z.string(), url: z.string().url(), publisher: z.string().optional(), date: z.string().optional() });
const AXES = ['privacy', 'custody', 'funding', 'continuity', 'independence'] as const;
export const axis = z.enum(AXES);
const maturity = z.enum(['research', 'experimental', 'early', 'production']);

const organs = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/organs' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    role: z.string(), // one line: what the organ is
    axes: z.array(axis).min(1),
    must: z.array(z.string()).min(1), // what it must do
    threat: z.string(), // what it defends against
    options: z.array(z.object({ name: z.string(), maturity, note: z.string(), technology: reference('technologies').optional() })).min(1),
    unsolved: z.string(),
    technologies: z.array(reference('technologies')).default([]),
    verified: date,
    sources: z.array(source).min(1),
  }),
});

const technologies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/technologies' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    maturity,
    verdict: z.string(), // one-sentence assessment from the organism's point of view
    components: z.array(z.object({ name: z.string(), what: z.string(), maturity, url: z.string().url().optional() })).min(1),
    organs: z.array(reference('organs')).min(1),
    verified: date,
    sources: z.array(source).min(1),
  }),
});

const rating = z.object({ score: z.number().int().min(0).max(3), note: z.string() });
const specimens = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/specimens' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['agent', 'framework', 'experiment', 'platform']),
    by: z.string(),
    since: z.coerce.string(),
    status: z.enum(['active', 'dormant', 'dead', 'unknown']),
    statusEvidence: z.string(),
    level: z.number().int().min(0).max(5),
    levelNote: z.string(),
    ratings: z.object({ privacy: rating, custody: rating, funding: rating, continuity: rating, independence: rating }),
    summary: z.string(),
    lesson: z.string(), // what the organism should copy or avoid
    technologies: z.array(reference('technologies')).default([]),
    assessed: date,
    sources: z.array(source).min(1),
  }),
});

const developments = defineCollection({
  loader: file('content/developments.yaml'),
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/),
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['organism', 'attack', 'infrastructure', 'research', 'market']),
    organs: z.array(reference('organs')).default([]),
    technologies: z.array(reference('technologies')).default([]),
    specimens: z.array(reference('specimens')).default([]),
    sources: z.array(source).min(1),
  }),
});

const builders = defineCollection({
  loader: file('content/builders.yaml'),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['organisation', 'project', 'lab', 'protocol']),
    builds: z.string(),
    url: z.string().url(),
    technologies: z.array(reference('technologies')).default([]),
    specimens: z.array(reference('specimens')).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({ title: z.string(), summary: z.string(), verified: date }),
});

export const collections = { organs, technologies, specimens, developments, builders, pages };
