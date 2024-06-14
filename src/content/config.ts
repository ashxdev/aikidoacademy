import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		keywords: z.string().optional(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
})


const video = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		keywords: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		videoId: z.string(),
		heroImage: z.string().optional(),
	}),
})

export const collections = { blog, video }
