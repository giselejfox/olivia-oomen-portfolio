export default function FullWidthImage({ project, imageName, altText}) {
    return (
        <img className="full-width-image" src={"img/" + project + "/" + imageName} alt={altText} />
    )
}