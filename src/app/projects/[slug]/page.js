import { fetchEntryBySlug, fetchEntries } from '@/lib/contentful';

import ProjectContent from '@/components/ProjectContent';

export async function generateStaticParams() {
  const projects = await fetchEntries('projectPage');
  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await fetchEntryBySlug('projectPage', slug);

//   console.log(project)

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <main>
      <h1>{project.fields.externalTitle}</h1>
      <p>{project.fields.duration}</p>
      <p>{JSON.stringify(project.fields.content,null,'\t')}</p>
      <ProjectContent contentBlocks={project.fields.content} />
    </main>
  );
}