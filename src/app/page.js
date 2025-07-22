import ListingCard from '@/components/ListingCard';
import PhysicsWrapper from '@/components/PhysicsWrapper';
import { fetchEntries } from '@/lib/contentful';
import { Row, Col } from 'react-bootstrap';

export default async function Home() {

  const projects = await fetchEntries('projectPage');

  const projectData = projects.map(project => ({
    title: project.fields.externalTitle || 'Project Title',
    slug: project.fields.slug,
    iconUrl: `https:${project.fields.iconPicture.fields.image.fields.file.url}`,
    imageWidth: project.fields.iconPicture.fields.image.fields.file.details.image.width,
    imageHeight: project.fields.iconPicture.fields.image.fields.file.details.image.height,
  }));

  console.log('Project Data:', projectData);

  return (
    <div className='container'>
      {/* <h1 className='mt-4'>Welcome to the Portfolio</h1> */}
      {/* <Row>
        {projectData.map((project) => (
          <Col key={project.slug} xs={12} sm={6} md={4} lg={3}>
            <ListingCard
              slug={project.slug}
              title={project.title}
              iconUrl={project.iconUrl}
            />
          </Col>
        ))}
      </Row> */}
      <PhysicsWrapper projectData={projectData}/>
    </div>
  );
}
