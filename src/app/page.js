import { fetchEntries } from '@/lib/contentful';
import HomeClient from '@/components/HomeClient';

export default async function Home() {

  const projects = await fetchEntries('projectPage');

  const projectData = projects
    .filter(project => project.fields.displayed)
    .map(project => ({
      title: project.fields.externalTitle || 'Project Title',
      slug: project.fields.slug,
      iconUrl: `https:${project.fields.iconPicture.fields.image.fields.file.url}`,
      imageWidth: project.fields.iconPicture.fields.image.fields.file.details.image.width,
      imageHeight: project.fields.iconPicture.fields.image.fields.file.details.image.height,
    }));

  console.log('Project Data:', projects[0].fields.displayed);

  return <HomeClient projectData={projectData} />;
}
