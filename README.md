<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>love</title>
    <style>
        
    body {
      margin: 0;
      background: black;
      overflow: hidden;
      cursor: none;
      touch-action: manipulation;
    }
    canvas {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .center-message {
      font-family: 'Courier New', monospace;
      color: #9969ff; /* Rosa brillante */
      font-size: 6rem;
      text-align: center;
      opacity: 0.8;
      text-shadow: 0 0 10px rgba(105, 185, 255, 0.7);
    }
    @media (max-width: 768px) {
      .center-message {
        font-size: 3rem;
      }
    }
    .heart-cursor {
      position: absolute;
      width: 32px;
      height: 32px;
      z-index: 9999;
      pointer-events: none;
      transition: transform 0.1s ease;
      filter: drop-shadow(0 0 4px #17555d);
    }
    #audio-control {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
  
    </style>
</head>
<body>
    <canvas id="canvas" width="414" height="896"></canvas>
    <div class="overlay">
        <div class="center-message">Hola Misiel :3</div>
    </div>
    <img id="cursor" class="heart-cursor" src="mk.png" alt="heart" style="left: 112px; top: 222px; transform: scale(1);">
    <audio id="audio-control" src="romeo.mp3" preload="auto"></audio>
    <script>
        
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
  document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio-control');
    
    function playAudio() {
      audio.volume = 0.8;
      audio.play().catch(error => {
        console.log('Error al reproducir audio:', error);
      });
    }
    
    document.body.addEventListener(isTouchDevice ? 'touchstart' : 'click', function() {
      playAudio();
    });
  });

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cursor = document.getElementById('cursor');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (isTouchDevice) {
    cursor.style.display = 'none';
  } else {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX - 16}px`;
      cursor.style.top = `${e.clientY - 16}px`;
      cursor.style.transform = `scale(${1 + Math.sin(Date.now()/300)*0.05})`;
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1.1)';
      setTimeout(() => {
        cursor.style.transform = 'scale(1)';
      }, 100);
    });
  }

  const text = "TE ADORO";
  const baseFontSize = isTouchDevice ? 24 : 42;
  const columns = Math.floor(canvas.width / (baseFontSize * 2));
  const drops = new Array(columns).fill(1);

  ctx.font = `bold ${baseFontSize}px monospace`;

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#168c18ff"; /* Rosa brillante */
    for (let i = 0; i < drops.length; i++) {
      const x = i * baseFontSize * 2;
      const y = drops[i] * baseFontSize;
      
      ctx.shadowColor = "rgba(17, 137, 23, 0.7)";
      ctx.shadowBlur = 10;
      ctx.fillText(text, x, y);
      
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.992) {
        drops[i] = 0;
      }
      drops[i] += 0.3;
    }
  }

  let particles = [];
  const handleInteraction = (e) => {
    const x = isTouchDevice ? e.touches[0].clientX : e.clientX;
    const y = isTouchDevice ? e.touches[0].clientY : e.clientY;
    
    const directions = [
      {x: 0, y: -1},
      {x: 0, y: 1},
      {x: -1, y: 0},
      {x: 1, y: 0}
    ];
    
    directions.forEach(dir => {
      particles.push({
        x: x,
        y: y,
        vx: dir.x * (3 + Math.random() * 2),
        vy: dir.y * (3 + Math.random() * 2),
        alpha: 1,
        size: baseFontSize + Math.random() * 30,
        color: `#${Math.random() > 0.5 ? '9969ff' : '9969ff'}` /* Alterna entre rosas */
      });
    });

    for (let i = 0; i < 16; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        size: baseFontSize + Math.random() * 20,
        color: `#${Math.random() > 0.5 ? '9969ff' : '9969ff'}` /* Alterna entre rosas */
      });
    }
  };

  canvas.addEventListener(isTouchDevice ? 'touchstart' : 'click', handleInteraction);

  function drawParticles() {
    particles.forEach((p, index) => {
      ctx.globalAlpha = p.alpha;
      ctx.font = `bold ${p.size}px monospace`;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.fillText("TE ADORO", p.x, p.y);
      ctx.shadowBlur = 0;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.005;
      if (p.alpha <= 0) {
        particles.splice(index, 1);
      }
    });
    ctx.globalAlpha = 1;
  }

  function animate() {
    drawMatrix();
    drawParticles();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.floor(canvas.width / (baseFontSize * 2));
    drops.length = columns;
    drops.fill(1);
  });

    </script>
</body> 
</html>
