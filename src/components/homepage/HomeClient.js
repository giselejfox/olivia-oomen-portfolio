'use client'

import { useEffect, useState } from 'react';
import PhysicsWrapper from '@/components/homepage/PhysicsWrapper';
import ProjectListingPage from '@/components/homepage/ProjectListingPage';

export default function HomeClient({ projectData }) {
  const [isBigScreen, setIsBigScreen] = useState(null); // null: unknown screen size

  useEffect(() => {
    const checkScreen = () => {
      setIsBigScreen(window.innerWidth > 768);
    };

    checkScreen(); // Set initial value

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (isBigScreen === null) return null; // Or a loading fallback

  return (
    <div className='container'>
      {isBigScreen
        ? <PhysicsWrapper projectData={projectData} />
        : <ProjectListingPage projectData={projectData} />}
    </div>
  );
}