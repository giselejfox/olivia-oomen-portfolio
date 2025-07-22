'use client';

import Script from 'next/script';
import React from 'react';

export default function ModelViewer() {
  return (
    <>
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="beforeInteractive"
      />
      <model-viewer
        style={{ height: "80vh", width: "100%" }}
        src="/img/aboutmefigure-compressed02.glb"
        poster="/img/poster.png"
        camera-controls
        tone-mapping="commerce"
      ></model-viewer>
    </>
  );
}