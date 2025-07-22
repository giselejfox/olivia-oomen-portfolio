'use client'

// import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { Body, Engine, Render, World, Bodies, Mouse, MouseConstraint, Events, Runner} from 'matter-js';
import Matter from 'matter-js';

import { useRouter } from 'next/navigation';

import Navbar from './NavBar';

export default function MainSplash2D() {
    // Add resize event listener to the main component
    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            // Debounce the resize event to prevent multiple reloads
            resizeTimer = setTimeout(() => {
                window.location.reload();
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    console.log('MainSplash2D component rendered');

    return (
        <div>
            {/* <FloatingImages2D /> */}
            <PhysicsScene />
            {/* <div style={{ zIndex: 1 }} className="content-wrapper d-flex vh-100 flex-column justify-content-between">
                <Navbar />
                <ProjectBar />
            </div> */}
        </div>
    )
}

function PhysicsScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    const engine = initializeEngine()
    const world = engine.world;
    const render = initializeRender(sceneRef, engine);

    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const isBigScreen = windowWidth >= 768

    // I want the scale to make it so the images are no larger than 400px on the larger screen and 200px on the smaller screen

    const bodies = projectData.map((project) => {
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;

        const body = Bodies.rectangle(x, y, 100, 100, {
            restitution: 0.6,
            render: {
                sprite: {
                    texture: project.iconUrl,
                    xScale: isBigScreen ? getScale({ width: project.imageWidth, height: project.imageHeight }, 400) : getScale({ width: project.imageWidth, height: project.imageHeight }, 200),
                    yScale: isBigScreen ? getScale({ width: project.imageWidth, height: project.imageHeight }, 400) : getScale({ width: project.imageWidth, height: project.imageHeight }, 200),
                }
            },
            label: project.slug
        });

        Matter.Body.setAngularVelocity(body, 0.1); // adjust the value as needed

        return body;
    })

    const walls = createWalls();

    World.add(world, [...walls, ...bodies]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: {
            visible: false,
            },
        },
    });

    World.add(world, mouseConstraint);

    // Sync mouse with rendering
    render.mouse = mouse;

    // Run engine and renderer
    const runner = Matter.Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
}

const projectData = [
  {
    title: 'Onsight',
    slug: 'onsight',
    iconUrl: 'https://images.ctfassets.net/b6prw4zfn5ww/1Jp15apVSZHoY40CdSlUO0/9cd5588c7d50c446a77e4bd3fcf38e9b/onsighthomepage_copy.png',
    imageWidth: 2199,
    imageHeight: 1596
  },
  {
    title: 'Beam',
    slug: 'beam',
    iconUrl: 'https://images.ctfassets.net/b6prw4zfn5ww/3YWGKewYZJwBkbaTseexPk/72e1e2274809d26767c3fb92f35bbbb9/beamhomepage_copy.png',
    imageWidth: 335,
    imageHeight: 997
  }
]

function areDatesWithinTwoSeconds(date1, date2) {
    // Convert date numbers to Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Get the difference in milliseconds between the two dates
    const diff = Math.abs(d1 - d2);
    
    // Check if the difference is less than or equal to 2000 milliseconds (2 seconds)
    return diff <= 1000;
}

function getScale({ width, height }, maxSize) {
  const largestDimension = Math.max(width, height);
  const scale = maxSize / largestDimension;
  return scale;
}

const initializeEngine = () => {
    const engine = Matter.Engine.create({
        gravity: { x: 0, y: 0 }
    });
    return engine;
};

const initializeRender = (sceneRef, engine) => {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: windowWidth,
        height: windowHeight,
        background: 'white',
        wireframes: false,
        slop: 0.7, // Adjust this value to reduce distortion
      },
    });
    return render;
};

const createWalls = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const floor = Bodies.rectangle(width / 2, height, width, 20, {
        isStatic: true,
        render: { fillStyle: 'none' },
    });
    const leftWall = Bodies.rectangle(0, height / 2, 20, height, {
        isStatic: true,
        render: { fillStyle: 'none' },
    });
    const rightWall = Bodies.rectangle(width, height / 2, 20, height, {
        isStatic: true,
        render: { fillStyle: 'none' },
    });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 20, {
        isStatic: true,
        render: { fillStyle: 'none' },
    });
    return [floor, leftWall, rightWall, ceiling];
};

export function ProjectBar() {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div style={{ zIndex: 2 }} className="d-flex flex-wrap justify-content-center project-bar mb-5 pb-4">
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/onsight" onClick={handleLinkClick}>
                    ONSIGHT
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/kit" onClick={handleLinkClick}>
                    KIT
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/motion" onClick={handleLinkClick}>
                    MOTION
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/well" onClick={handleLinkClick}>
                    WELL
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/conversation-ave" onClick={handleLinkClick}>
                    CONVERSATION AVE
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/site-archive-cite" onClick={handleLinkClick}>
                    SITE / ARCHIVE / CITE
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/coda" onClick={handleLinkClick}>
                    CODA
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/beam" onClick={handleLinkClick}>
                    BEAM
                </Link>
            </div>
            <div className="mx-2">
                <Link className="main-splash-link fw-bold" to="/spur" onClick={handleLinkClick}>
                    SPUR
                </Link>
            </div>
        </div>
    );
}