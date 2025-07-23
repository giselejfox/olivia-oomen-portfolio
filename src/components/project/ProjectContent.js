import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ProjectHeading from './ProjectHeading';
import ProjectText from '../content-blocks/ProjectText';
import FullWidthImage from '../content-blocks/FullWidthImage';
import TwoColumnImageLayout from '../content-blocks/TwoColumnImageLayout';
import SectionHeading from '../content-blocks/SectionHeading';
import Video from '../content-blocks/Video';

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
            return <ProjectText key={block.sys.id} richText={richText}/>;

          case 'fullWidthImage':
            const imageUrl = `https:${fields.media.fields.image.fields.file.url}`
            const altText = fields.media.fields.altText
            return <FullWidthImage key={block.sys.id} imageUrl={imageUrl} altText={altText}/>;

          case 'twoColumnImageLayout':
            const imageData = [
              { altText: fields.leftImage.fields.altText, imageURL: `https:${fields.leftImage.fields.image.fields.file.url}`},
              { altText: fields.rightImage.fields.altText, imageURL: `https:${fields.rightImage.fields.image.fields.file.url}`}
            ];
            return <TwoColumnImageLayout key={block.sys.id} imageData={imageData} />;
          
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