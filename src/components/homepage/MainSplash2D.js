'use client'

import React, { useEffect, useRef } from 'react';
import { Render, Bodies, Mouse, MouseConstraint, Events } from 'matter-js';
import Matter from 'matter-js';
import { useRouter } from 'next/navigation';

import ProjectBar from './ProjectsBar';

import { getScale, areDatesWithinTwoSeconds } from '@/lib/utils';

export default function MainSplash2D({ projectData }) {
    const router = useRouter();
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

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
        }}>
            <PhysicsScene router={router} projectData={projectData} />
            <div style={{ zIndex: 1 }} className="content-wrapper d-flex vh-100 flex-column justify-content-end">
                <ProjectBar projectData={projectData} />
            </div>
        </div>
    )
}

function PhysicsScene({ router, projectData }) {
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

        const scale = getScale({ width: project.imageWidth, height: project.imageHeight }, 400)
        const boxHeight = project.imageHeight * (scale - 0.05) // 0.1 lets them overlap a bit
        const boxWidth = project.imageWidth * (scale - 0.05) // 0.1 lets them overlap a bit

        const body = Bodies.rectangle(x, y, boxWidth, boxHeight, {
            restitution: 0.6,
            render: {
                sprite: {
                    texture: project.iconUrl,
                    xScale: scale,
                    yScale: scale
                }
            },
            label: project.slug
        });

        Matter.Body.setAngularVelocity(body, 0.1); // adjust the value as needed

        return body;
    })

    const text = Bodies.rectangle(windowWidth / 2, windowHeight / 2, 1, 1, {
        isStatic: true, // Set the body as static
        collisionFilter: {
            category: 0,
            mask: 0, // don't collide with anything
        },
        render: {
            sprite: {
                texture: 'img/texthomepage.png',
                xScale: isBigScreen ? .2 : .1,
                yScale: isBigScreen ? .2 : .1,
            }
        }
    });

    const walls = createWalls();

    World.add(world, [text, ...walls, ...bodies]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(render.canvas),
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    // Add an event listener to prevent default behavior on mouse clicks
    mouseConstraint.mouse.element.addEventListener("mousedown", function (event) {
        event.preventDefault();
    });

    // This helps determine what's been double clicked
    let lastMouseDownInfo = {bodyLabel: "starter", date: 0}

    Events.on(mouseConstraint, "mousedown", () => {
        const body = mouseConstraint.body;
        const now = Date.now();
        // if we've clicked on a body and the last click we did was on the same body and less than 1 second ago
        // then we open that project page
        if (body) {
            const doubleClick = areDatesWithinTwoSeconds(Date.now(), lastMouseDownInfo.date) && mouseConstraint.body.label === lastMouseDownInfo.bodyLabel
            if (doubleClick) {
                router.push(`/work/${body.label}`)
            } else { // otherwise we rest the last thing we clicked
                lastMouseDownInfo = {bodyLabel: mouseConstraint.body.label, date: now}
            }
        }
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