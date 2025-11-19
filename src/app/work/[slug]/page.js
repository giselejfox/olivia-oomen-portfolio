import { draftMode } from "next/headers";
import { fetchEntryBySlug, fetchEntries } from '@/lib/contentful';

import ProjectContent from '@/components/project/ProjectContent';
import ProjectHeading from '@/components/project/ProjectHeading';

// --- Static Paths ---
export async function generateStaticParams() {
  const projects = await fetchEntries('projectPage');
  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

// --- Page ---
export default async function ProjectPage({ params }) {
  const { slug } = await params;

  // ⭐ Detect preview mode
  const { isEnabled: preview } = draftMode();

  // ⭐ Fetch entry with preview flag
  const project = await fetchEntryBySlug("projectPage", slug, preview);

  // const project = await fetchEntryBySlug('projectPage', slug);

  if (!project) {
    return <p>Project not found.</p>;
  }

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