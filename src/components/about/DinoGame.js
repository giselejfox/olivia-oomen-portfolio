import { useEffect, useRef, useState } from "react";

export default function DinoGame() {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas size
    const width = 800;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // Dino properties
    const dino = {
      x: 50,
      y: height - 40,
      width: 30,
      height: 40,
      dy: 0,
      gravity: 1,
      jumpPower: -15,
      isJumping: false
    };

    // Obstacles
    let obstacles = [];
    let speed = 6;
    let frame = 0;
    let running = true;

    function spawnObstacle() {
      obstacles.push({
        x: width,
        y: height - 30,
        width: 20,
        height: 30
      });
    }

    function resetGame() {
      obstacles = [];
      setScore(0);
      frame = 0;
      running = true;
      setGameOver(false);
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

      // Spawn obstacles
      if (frame % 90 === 0) {
        spawnObstacle();
      }

      // Update dino
      dino.dy += dino.gravity;
      dino.y += dino.dy;

      if (dino.y >= height - dino.height) {
        dino.y = height - dino.height;
        dino.isJumping = false;
      }

      // Draw dino
      ctx.fillStyle = "black";
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

      // Update obstacles
      ctx.fillStyle = "green";
      obstacles.forEach((ob, i) => {
        ob.x -= speed;
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);

        // Collision detection
        if (
          dino.x < ob.x + ob.width &&
          dino.x + dino.width > ob.x &&
          dino.y < ob.y + ob.height &&
          dino.y + dino.height > ob.y
        ) {
          running = false;
          setGameOver(true);
        }

        // Remove off-screen obstacles
        if (ob.x + ob.width < 0) {
          obstacles.splice(i, 1);
        }
      });

      // Increase score
      setScore(prev => prev + 1);

      requestAnimationFrame(update);
    }

    update();

    // Keyboard controls
    function handleKey(e) {
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (gameOver) resetGame();
        else jump();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [gameOver]);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h2>Dino Run</h2>
      <canvas
        ref={canvasRef}
        style={{ background: "#f7f7f7", border: "1px solid #888" }}
      />
      <h3>Score: {score}</h3>
      {gameOver && <h2 style={{ color: "red" }}>Game Over — Press Space to Restart</h2>}
    </div>
  );
}
