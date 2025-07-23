import ProjectListingPage from '@/components/homepage/ProjectListingPage';
import { fetchEntries } from '@/lib/contentful';

export default async function WorkListingPage() {
    const work = await fetchEntries('workListingPage');

    console.log(work[0].fields.projectPages[0].fields.iconPicture);

    const workData = work[0].fields.projectPages
    .map(workPage => ({
        title: workPage.fields.externalTitle || 'Project Title',
        slug: workPage.fields.slug,
        iconUrl: `https:${workPage.fields.iconPicture.fields.image.fields.file.url}`,
        imageWidth: workPage.fields.iconPicture.fields.image.fields.file.details.image.width,
        imageHeight: workPage.fields.iconPicture.fields.image.fields.file.details.image.height,
    }));

    return(<div className='container'><ProjectListingPage projectData={workData} /></div>)
}