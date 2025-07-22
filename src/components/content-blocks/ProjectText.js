export default function Paragraph({ text, richText }) {
    return (
        <div className="container pb-5 fw-bold lh-lg">
            {richText}
        </div>
    )
}