import React, { useEffect } from 'react';

export default function ImagePreloader({ imageNumber }) {
    useEffect(() => {
      const img = new Image();
      img.src = `img/honors-project/background-gif/lofi-${imageNumber}.jpg`;
  
      img.onerror = () => {
        console.error(`Error loading image: lofi-${imageNumber}.jpg`);
      };
  
      // Cleanup: Remove event listeners and free up resources when component is unmounted
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [imageNumber]);
  
    return <></>; // This component doesn't render anything to the DOM
};