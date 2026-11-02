import Image from 'next/image';

export default function CustomCropImage({
  imageURL,
  altText,
  imageHeight,
  imageWidth,
  customRatio,
  focalPoint,
  sizes = "100vw",
  priority = false,
  quality = 85,
  unoptimized = false
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
      landscape_3_2: { w: 3000, h: 2000 },
      portrait_4_5: { w: 2400, h: 3000 }
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
      url: `${url}?fit=fill&w=${size.w}&h=${size.h}&f=${focalPoint || "center"}&q=100`,
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
      sizes={sizes}
      quality={quality}
      priority={priority}
      unoptimized={unoptimized}
      style={{ objectFit: mode === "crop" ? "cover" : "contain" }}
    />
    </div>
  );
}
