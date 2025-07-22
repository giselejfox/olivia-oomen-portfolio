
export default function TwoColumnImageLayout({ project, imageData }) {

    const imageElements = imageData.map((image) => {
        return (
            <div key={image.altText} className="col d-flex justify-content-center align-items-center">
                <img className="col-image" src={image.imageURL} alt={image.altText} />
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-2 mb-2">
                {imageElements}
            </div>
        </div>
    )
}