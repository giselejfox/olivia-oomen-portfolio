import { fetchEntries } from '@/lib/contentful';
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import HomeClient from '@/components/homepage/HomeClient';

export default async function Home() {

  // Detect draft mode
  const { isEnabled: preview } = draftMode();

  // Disable all caching in preview mode
  if (preview) {
    noStore();
  }

  const work = await fetchEntries('workListingPage', preview);

  // console.log('Fetched Projects:', projects);

  const projectData = work[0].fields.projectPages
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
