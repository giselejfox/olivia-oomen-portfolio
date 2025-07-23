import { fetchEntryBySlug, fetchEntries } from '@/lib/contentful';

import ProjectContent from '@/components/project/ProjectContent';
import ProjectHeading from '@/components/project/ProjectHeading';

export async function generateStaticParams() {
  const projects = await fetchEntries('projectPage');
  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = await fetchEntryBySlug('projectPage', slug);

    if (!project) {
        return <p>Project not found.</p>;
    }

    const title = project.fields.externalTitle || 'Project Title';
    const description = project.fields.shortDescription || 'Project Description';
    const collaborators = project.fields.collaborators ? "COLLABORATORS: " + project.fields.collaborators : 'INDIVIDUAL PROJECT';
    const duration = project.fields.duration.toUpperCase() || 'Duration';
    const date = project.fields.date.toUpperCase() || 'Date';   

  return (
    <main>
        <ProjectHeading title={title} description={description} duration={duration} collaborators={collaborators} date={date}/>
        <ProjectContent contentBlocks={project.fields.content} />
    </main>
  );
}