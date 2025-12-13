import { fetchEntries } from '@/lib/contentful';
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import HomeClient from '@/components/homepage/HomeClient';

export default async function Home() {
  const { isEnabled: preview } = draftMode();
  
  if (preview) {
    noStore();
  }

  const work = await fetchEntries('workListingPage', preview);

  const allProjects = work[0].fields.projectPages
    .map(project => ({
      title: project.fields.externalTitle || 'Project Title',
      slug: project.fields.slug,
      iconUrl: `https:${project.fields.iconPicture.fields.image.fields.file.url}`,
      imageWidth: project.fields.iconPicture.fields.image.fields.file.details.image.width,
      imageHeight: project.fields.iconPicture.fields.image.fields.file.details.image.height,
      homepageIconResizeFactor: project.fields.homepageIconResizeFactor || 1,
      displayed: project.fields.displayed,
    }));

  const displayedProjects = allProjects.filter(project => project.displayed);

  return <HomeClient allProjects={allProjects} displayedProjects={displayedProjects} />;
}