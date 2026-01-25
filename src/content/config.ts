import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string().optional().default('无标题'),
        slug: z.string().optional(),
		description: z.string().optional().default(''),
		pubDate: z.coerce.date().optional().default(() => new Date()),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
        slug: z.string().optional(),
		description: z.string(),
        link: z.string().url().optional(),
        repo: z.string().url().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
	}),
});

const about = defineCollection({
    type: 'content',
    schema: z.object({
        headline: z.string(),
        skills: z.array(z.string()),
        experience: z.array(z.object({
            role: z.string(),
            company: z.string(),
            period: z.string(),
            description: z.string().optional(),
        })),
        socialLinks: z.object({
            email: z.string().optional(),
            github: z.string().optional(),
            twitter: z.string().optional(),
        }).optional(),
    }),
});

export const collections = { blog, projects, about };
