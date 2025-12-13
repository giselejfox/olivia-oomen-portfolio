'use client'
import { useEffect, useState } from 'react';
import PhysicsWrapper from '@/components/homepage/PhysicsWrapper';
import ProjectListingPage from '@/components/homepage/ProjectListingPage';

export default function HomeClient({ allProjects, displayedProjects }) {
  const [isBigScreen, setIsBigScreen] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsBigScreen(window.innerWidth > 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (isBigScreen === null) return null;

  return (
    <div className='container'>
      {isBigScreen
        ? <PhysicsWrapper projectData={displayedProjects} />
        : <ProjectListingPage projectData={allProjects} />}
    </div>
  );
}