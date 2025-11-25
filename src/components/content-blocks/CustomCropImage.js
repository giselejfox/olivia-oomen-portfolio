import Image from 'next/image';

export default function CustomCropImage({
  imageURL,
  altText,
  imageHeight,
  imageWidth,
  customRatio,
  focalPoint
}) {

  const buildImage = (url, ratio, focalPoint) => {
    if (ratio === "original") {
      return {
        url,
        mode: "original",
        arWidth: imageWidth,
        arHeight: imageHeight
      };
    }

    const sizeMap = {
      landscape_3_2: { w: 1500, h: 1000 },
      portrait_4_5: { w: 1200, h: 1500 }
    };

    const size = sizeMap[ratio];

    if (!size) {
      return {
        url,
        mode: "original",
        arWidth: imageWidth,
        arHeight: imageHeight
      };
    }

    return {
      url: `${url}?fit=fill&w=${size.w}&h=${size.h}&f=${focalPoint || "center"}`,
      mode: "crop",
      arWidth: size.w,
      arHeight: size.h
    };
  };

  const { url, mode, arWidth, arHeight } =
    buildImage(imageURL, customRatio, focalPoint);

  const aspectRatio = `${arWidth} / ${arHeight}`;
  const objectFit = mode === "crop" ? "cover" : "contain";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        overflow: "hidden" // prevents spillover in Bootstrap columns
      }}
    >
      <Image
        src={url}
        alt={altText}
        fill
        style={{ objectFit }}
      />
    </div>
  );
}
