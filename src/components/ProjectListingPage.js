import ListingCard from "./ListingCard"
import { Row, Col } from "react-bootstrap";

export default function ProjectListingPage({ projectData }) {
    return (
        <Row>
            {projectData.map((project) => (
                <Col key={project.slug} xs={12} sm={6} md={4} lg={3} className="py-4">
                    <ListingCard
                        slug={project.slug}
                        title={project.title}
                        iconUrl={project.iconUrl}
                    />
                </Col>
            ))}
        </Row> 
    )
}