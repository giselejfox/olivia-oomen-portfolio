export default function SectionHeading({ heading }) {
    return (
        <div className="mt-5 pt-5 mb-5">
            <h2 className="container section-header">{ heading.toUpperCase() }</h2>
        </div>
    )
}