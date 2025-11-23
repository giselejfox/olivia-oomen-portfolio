import Image from 'next/image';

export default function CustomCropImage({ image, entry }) {
    
    const buildImageUrl = (url, ratio, focalPoint) => {
        const size = {
            landscape_3_2: { w: 1600, h: 900 },
            portrait_4_5: { w: 1200, h: 1500 }
        }[ratio];

        return `${url}?fit=thumb&w=${size.w}&h=${size.h}&f=${focalPoint}`;
    };

    return (
        <Image
            src={buildImageUrl(image.url, entry.cropRatio, entry.focalPoint)}
            alt={image.description}
        />
    )
}