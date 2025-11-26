import ProjectListingPage from '@/components/homepage/ProjectListingPage';
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { fetchEntries } from '@/lib/contentful';

export const metadata = {
  title: "Work",
};

export default async function WorkListingPage() {

    // Detect draft mode
    const { isEnabled: preview } = draftMode();

    // Disable all caching in preview mode
    if (preview) {
        noStore();
    }

    const work = await fetchEntries('workListingPage', preview);

    // console.log(work[0].fields.projectPages[0].fields.iconPicture);

    const workData = work[0].fields.projectPages
        .map(workPage => ({
            title: workPage.fields.externalTitle || 'Project Title',
            slug: workPage.fields.slug,
            iconUrl: `https:${workPage.fields.iconPicture.fields.image.fields.file.url}`,
            imageWidth: workPage.fields.iconPicture.fields.image.fields.file.details.image.width,
            imageHeight: workPage.fields.iconPicture.fields.image.fields.file.details.image.height,
        }));

    return (<div className='container'><ProjectListingPage projectData={workData} /></div>)
}