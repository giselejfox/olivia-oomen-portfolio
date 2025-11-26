import CustomCropImage from "./CustomCropImage"

export default function TwoColumnImageLayout({ imageData, proportions }) {

    const imageElements = imageData.map((image, index) => {

        // Determine which proportion to use
        const proportion =
            index === 0
                ? proportions.leftImageProportion
                : proportions.rightImageProportion;

        // Build Bootstrap column class from proportion (example: "col-7")
        const colClass = `col-lg-${proportion}`;

        return (
            <div
                key={image.altText}
                className={`col-12 ${colClass} d-flex justify-content-center align-items-center`}
            >
                <CustomCropImage
                    imageURL={image.imageURL}
                    altText={image.altText}
                    imageHeight={image.imageHeight}
                    imageWidth={image.imageWidth}
                    customRatio={image.customRatio}
                    focalPoint={image.focalPoint}
                />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row mb-2">
                {imageElements}
            </div>
        </div>
    )
}