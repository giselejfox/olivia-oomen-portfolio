'use client'

import { useEffect, useRef, useState } from "react";

export default function DinoGame() {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameOverRef = useRef(false);
    useEffect(() => {
        gameOverRef.current = gameOver;
    }, [gameOver]);

    const spriteOffset = 3; // raise sprites 3px above the ground line

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // --- NEW: Load dino sprites ---
        const dinoRunImg = new Image();
        dinoRunImg.src = "/img/dino-game/liv_walking.jpeg";

        const dinoJumpImg = new Image();
        dinoJumpImg.src = "/img/dino-game/liv_jumping.jpeg";

        // Obstacles PNG
        const cactusImg = new Image();
        cactusImg.src = "/img/dino-game/keyboard.jpeg";

        const width = 800;
        const height = 450;
        canvas.width = width;
        canvas.height = height;

        const dino = {
            x: 50,
            y: height - 40,
            width: 100,
            height: 175,
            dy: 0,
            gravity: 0.8,
            jumpPower: -20,
            isJumping: false
        };

        // Change width based on jumping
        dino.width = dino.isJumping ? 200 : 100;

        let obstacles = [];
        let speed = 6;
        let frame = 0;
        let animationId;
        let running = true;

        function spawnObstacle() {
            obstacles.push({
                x: width,
                y: height - 60,
                width: 70,
                height: 60
            });
        }

        function resetGame() {
            obstacles = [];
            frame = 0;
            running = true;
            dino.y = height - dino.height;
            dino.dy = 0;
            dino.isJumping = false;

            setScore(0);
            setGameOver(false);

            update();
        }

        function jump() {
            if (!dino.isJumping) {
                dino.dy = dino.jumpPower;
                dino.isJumping = true;
            }
        }

        function update() {
            if (!running) return;

            frame++;
            ctx.clearRect(0, 0, width, height);

            // Ground line
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, height - 1);
            ctx.lineTo(width, height - 1);
            ctx.stroke();

            // Spawn obstacles
            if (frame % 90 === 0) spawnObstacle();

            // Update dino physics
            dino.dy += dino.gravity;
            dino.y += dino.dy;

            // Hit ground
            if (dino.y >= height - dino.height) {
                dino.y = height - dino.height;
                dino.isJumping = false;
            }

            // --- NEW: choose correct sprite ---
            const dinoImg = dino.isJumping ? dinoJumpImg : dinoRunImg;

            // Draw dino
            ctx.drawImage(dinoImg, dino.x, dino.y - spriteOffset, dino.width, dino.height);

            // Dino border (black outline)
            // ctx.strokeStyle = "black";
            // ctx.lineWidth = 2;
            // ctx.strokeRect(dino.x, dino.y, dino.width, dino.height);


            // Obstacles
            obstacles.forEach((ob, i) => {
                ob.x -= speed;
                ctx.drawImage(cactusImg, ob.x, ob.y - spriteOffset, ob.width, ob.height);

                // Obstacle border
                // ctx.strokeStyle = "black";
                // ctx.lineWidth = 2;
                // ctx.strokeRect(ob.x, ob.y, ob.width, ob.height);


                // Collision
                if (
                    dino.x < ob.x + ob.width &&
                    dino.x + dino.width > ob.x &&
                    dino.y < ob.y + ob.height &&
                    dino.y + dino.height > ob.y
                ) {
                    running = false;
                    cancelAnimationFrame(animationId);
                    setGameOver(true);
                }

                if (ob.x + ob.width < 0) obstacles.splice(i, 1);
            });

            setScore(prev => prev + 1);

            animationId = requestAnimationFrame(update);
        }

        update();

        function handleKey(e) {
            if (e.code === "Space" || e.code === "ArrowUp") {
                e.preventDefault();

                if (gameOverRef.current) {
                    resetGame();
                } else {
                    jump();
                }
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <canvas
                ref={canvasRef}
                style={{
                    background: "white",
                    display: "block",
                    margin: "0 auto"
                }}
            />
            <h3 className="dino-game-text">score: {score}</h3>
            {gameOver && <p style={{ color: "red" }}>Game Over — Press Space to Restart</p>}
        </div>
    );
}
