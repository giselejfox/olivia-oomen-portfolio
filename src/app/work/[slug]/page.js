

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { fetchEntryBySlug, fetchEntries } from '@/lib/contentful';

import ProjectContent from '@/components/project/ProjectContent';
import ProjectHeading from '@/components/project/ProjectHeading';

// --- Page ---
export default async function ProjectPage({ params }) {
  const { slug } = await params;

  // Detect preview mode
  const { isEnabled: preview } = draftMode();
  console.log("Preview mode:", draftMode().isEnabled);

  // ⭐ Disable caching ONLY in preview mode
  if (preview) {
    noStore();
  }

  // Fetch entry with preview flag
  const project = await fetchEntryBySlug("projectPage", slug, preview);

  if (!project) return <p>Project not found.</p>;

  const fields = project.fields;
  const title = fields.externalTitle || "Project Title";
  const description = fields.shortDescription || "Project Description";
  const collaborators = fields.collaborators
    ? "COLLABORATORS: " + fields.collaborators
    : "INDIVIDUAL PROJECT";
  const duration = fields.duration?.toUpperCase() || "Duration";
  const date = fields.date?.toUpperCase() || "Date";

  return (
    <main>
      <ProjectHeading
        title={title}
        description={description}
        duration={duration}
        collaborators={collaborators}
        date={date}
      />
      <ProjectContent contentBlocks={fields.content} />
    </main>
  );
}