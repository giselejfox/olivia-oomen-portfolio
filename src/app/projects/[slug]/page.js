import { fetchEntryBySlug, fetchEntries } from '@/lib/contentful';

export async function generateStaticParams() {
  const projects = await fetchEntries('projectPage');
  return projects.map((project) => ({
    slug: project.fields.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await fetchEntryBySlug('projectPage', slug);

  console.log(project)

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <main>
      <h1>{project.fields.externalTitle}</h1>
      <p>{project.fields.duration}</p>
      {/* Render more project details */}
    </main>
  );
}