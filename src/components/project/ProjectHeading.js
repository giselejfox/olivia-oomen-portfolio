export default function ProjectHeading(props) {

    const title = props.title
    const description = props.description
    const collaborators = props.collaborators
    const duration = props.duration
    const date = props.date

    return (
        <div className="container py-5">
            <h1 className="mb-4">{title}</h1>
            <div className="d-flex flex-column flex-md-row flex-wrap justify-content-between fw-bold">
                <div className="pb-3 pb-lg-0 col-12 col-md-8 pe-5">{description}</div>
                <div className="px-0 pb-3 pb-lg-0 pe-md-4 col-12 col-md-2">{collaborators}</div>
                <div className="px-0 pb-3 pb-lg-0 pe-md-4 col-12 col-md-1">{duration}</div>
                <div className="px-0 pb-3 pb-lg-0 col-12 col-md-1">{date}</div>
            </div>
        </div>
    )
}