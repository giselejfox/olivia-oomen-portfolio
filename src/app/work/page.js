import ProjectListingPage from '@/components/homepage/ProjectListingPage';
import { fetchEntries } from '@/lib/contentful';

export default async function WorkListingPage() {
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

    return(<div className='container'><ProjectListingPage projectData={projectData} /></div>)
}