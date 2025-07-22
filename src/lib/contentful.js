import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const host = process.env.CONTENTFUL_HOST || 'cdn.contentful.com';

if (!space || !accessToken) {
  throw new Error(
    'Missing Contentful environment variables. Check your .env.local file.'
  );
}

export const contentfulClient = createClient({
    space: space,
    accessToken: accessToken,
})

// export const contentfulClient = createClient({
//   space,
//   accessToken,
//   environment,
//   host,
// });

export async function fetchEntries(contentType) {
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
    include: 1
  });
  return entries.items;
}

export async function fetchEntryBySlug(contentType, slug) {
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
    include: 3
  });
  return entries.items[0] || null;
}