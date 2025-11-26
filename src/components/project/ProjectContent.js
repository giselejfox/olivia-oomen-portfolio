import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// import ProjectHeading from './ProjectHeading';
import ProjectText from '../content-blocks/ProjectText';
import TwoColumnImageLayout from '../content-blocks/TwoColumnImageLayout';
import SectionHeading from '../content-blocks/SectionHeading';
import Video from '../content-blocks/Video';
import CustomCropImage from '../content-blocks/CustomCropImage';

const extractImageFields = (imageField) => {
  return {
    imageURL: `https:${imageField.fields.image.fields.file.url}`,
    altText: imageField.fields.altText,
    imageHeight: imageField.fields.image.fields.file.details.image.height,
    imageWidth: imageField.fields.image.fields.file.details.image.width,
    customRatio: imageField.fields.ratio || 'original',
    focalPoint: imageField.fields.focalPoint || 'center',
  };
};

export default function ProjectContent({ contentBlocks }) {
  return (
    <>
      {contentBlocks.map((block) => {
        const type = block.sys.contentType.sys.id;
        const fields = block.fields;

        // console.log(fields)

        switch (type) {
          case 'projectHeading':
            return <SectionHeading key={block.sys.id} heading={fields.projectHeading} />;

          case 'projectText':
            const richText = documentToReactComponents(fields.projectText)
            return <ProjectText key={block.sys.id} richText={richText} />;

          case 'fullWidthImage':
            const imageFields = extractImageFields(fields.media);
            return (
              <CustomCropImage
                imageURL={imageFields.imageURL}
                altText={imageFields.altText}
                imageHeight={imageFields.imageHeight}
                imageWidth={imageFields.imageWidth}
                customRatio={imageFields.customRatio}
                focalPoint={imageFields.focalPoint}
              />
            );

          case 'twoColumnImageLayout':
            const imageData = [
              extractImageFields(fields.leftImage),
              extractImageFields(fields.rightImage)
            ];
            const proportions = {
              leftImageProportion: fields.leftImageProportion || 6,
              rightImageProportion: fields.rightImageProportion || 6
            }
            return <TwoColumnImageLayout key={block.sys.id} imageData={imageData} proportions={proportions} />;

          case 'spacer':
            const height = fields.height || 5; // default to 5 if height is not specified
            return <div key={block.sys.id} className={`py-${height}`}></div>;

          case 'video':
            return <Video key={block.sys.id} videoUrl={fields.url} />

          default:
            return null; // unknown block type
        }
      })}
    </>
  );
}