import Link from 'next/link'

export default function ProjectBar({ projectData }) {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div style={{ zIndex: 2 }} className="d-flex flex-wrap justify-content-center project-bar mb-5 pb-4">
            {projectData.map((project, index) => (
                <div key={index} className="mx-2">
                    <Link className="main-splash-link fw-bold" href={`/project/${project.slug}`} onClick={handleLinkClick}>
                        {project.title.toUpperCase()}
                    </Link>
                </div>
            ))}
        </div>
    );
}