export default function ThreeColumnImageLayout({ project, imageData }) {

    const imageElements = imageData.map((image, index) => {
        return (
            <div key={image.imageTitle} className="col d-flex justify-content-center align-items-center">
                <img className="col-image" src={"img/" + project + "/" + image.imageTitle} alt={image.altText} />
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-3 mb-2">
                {imageElements}
            </div>
        </div>
    )
}