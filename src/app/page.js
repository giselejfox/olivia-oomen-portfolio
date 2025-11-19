import { fetchEntries } from '@/lib/contentful';
import HomeClient from '@/components/homepage/HomeClient';

export default async function Home() {

  const projects = await fetchEntries('projectPage');

  // console.log('Fetched Projects:', projects);

  const projectData = projects
    .filter(project => project.fields.displayed)
    .map(project => ({
      title: project.fields.externalTitle || 'Project Title',
      slug: project.fields.slug,
      iconUrl: `https:${project.fields.iconPicture.fields.image.fields.file.url}`,
      imageWidth: project.fields.iconPicture.fields.image.fields.file.details.image.width,
      imageHeight: project.fields.iconPicture.fields.image.fields.file.details.image.height,
      homepageIconResizeFactor: project.fields.homepageIconResizeFactor || 1,
    }));

  // console.log('Project Data:', projects[0].fields.displayed);

  return <HomeClient projectData={projectData} />;
}
