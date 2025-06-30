import { fetchEntryBySlug } from '@/lib/contentful';

export default async function Home() {

  const projects = await fetchEntryBySlug('projectPage', 'beam');

  console.log('Projects:', projects);

  return (
    <div className='container'>
      <h1 className='mt-4'>Welcome to the Portfolio</h1>
    </div>
  );
}
