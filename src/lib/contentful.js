import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (!space || !deliveryToken || !previewToken) {
  throw new Error(
    'Missing Contentful environment variables. Check your .env.local file.'
  );
}

// ⭐ Create a client dynamically depending on preview mode
export function getContentfulClient(preview = false) {
  return createClient({
    space,
    accessToken: preview ? previewToken : deliveryToken,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
    environment
  });
}

// ⭐ Fetch multiple entries (works for preview + production)
export async function fetchEntries(contentType, preview = false) {
  const client = getContentfulClient(preview);

  const entries = await client.getEntries({
    content_type: contentType,
    include: 2
  });

  return entries.items;
}

// ⭐ Fetch a single entry by slug (works for preview + production)
export async function fetchEntryBySlug(contentType, slug, preview = false) {
  const client = getContentfulClient(preview);

  const entries = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
    include: 3
  });

  return entries.items[0] || null;
}

// export const contentfulClient = createClient({
//     space: space,
//     accessToken: accessToken,
// })

// export async function fetchEntries(contentType) {
//   const entries = await contentfulClient.getEntries({
//     content_type: contentType,
//     include: 2
//   });
//   return entries.items;
// }

// export async function fetchEntryBySlug(contentType, slug) {
//   const entries = await contentfulClient.getEntries({
//     content_type: contentType,
//     'fields.slug': slug,
//     limit: 1,
//     include: 3
//   });
//   return entries.items[0] || null;
// }