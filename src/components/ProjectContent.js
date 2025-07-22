import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ProjectHeading from './content/ProjectHeading';
import ProjectText from './content/ProjectText';
import FullWidthImage from './content/FullWidthImage';
import TwoColumnImageLayout from './content/TwoColumnImageLayout';

// Optional helper to resolve media URLs (implement as needed)
// function resolveMediaUrl(url) {
//   return `https:${url}`;
// }

export default function ProjectContent({ contentBlocks }) {
  return (
    <>
      {contentBlocks.map((block) => {
        const type = block.sys.contentType.sys.id;
        const fields = block.fields;

        // console.log(fields)
        // console.log(fields.media.fields.image)

        switch (type) {
          case 'projectHeading':
            return <ProjectHeading key={block.sys.id} heading={fields.projectHeading} />;

          case 'projectText':
            const richText = documentToReactComponents(fields.projectText)
            return <ProjectText key={block.sys.id} richText={richText}/>;

          case 'fullWidthImage':
            // console.log(fields.media.fields.image.fields.file.url)
            const imageUrl = `https:${fields.media.fields.image.fields.file.url}`
            console.log(imageUrl)
            return <FullWidthImage key={block.sys.id} imageUrl={imageUrl}/>;

        //   case 'twoColumnImageLayout':
        //     const imageUrls = (fields.images || []).map(resolveMediaUrl);
        //     return <TwoColumnImageLayout key={block.sys.id} images={imageUrls} />;

          default:
            return null; // unknown block type
        }
      })}
    </>
  );
}