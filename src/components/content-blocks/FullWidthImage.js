export default function FullWidthImage({ project, imageUrl, altText}) {
    return (
        <img className="full-width-image" src={imageUrl} alt={altText} />
    )
}