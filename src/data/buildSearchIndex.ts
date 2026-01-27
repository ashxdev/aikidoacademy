import { getCollection } from 'astro:content';

export async function buildSearchIndex() {
  const posts = await getCollection('blog');

  return posts.map((post) => ({
    title: post.data.title,
    url: `/blog/${post.slug}/`,
    content: post.body
      .replace(/[#_*>\-\n]/g, ' ')
      .toLowerCase(),
  }));
}
