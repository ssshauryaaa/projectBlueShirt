import React, { useEffect, useRef } from 'react';

interface IcyCaveBackgroundProps {
  voltageGlitch?: boolean;
}

export const IcyCaveBackground: React.FC<IcyCaveBackgroundProps> = ({ voltageGlitch = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system: Frost crystals and glowing motes
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = ['#00FFFF', '#2994A7', '#C3BCEC', '#FECEE4', '#FFFF63'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.4, 50,
        width / 2, height * 0.5, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#1C1A4B');
      bgGrad.addColorStop(0.5, '#1B194E');
      bgGrad.addColorStop(1, '#0b0a24');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Light beam from cavern ceiling
      const beamGrad = ctx.createLinearGradient(width * 0.3, 0, width * 0.6, height);
      beamGrad.addColorStop(0, 'rgba(0, 255, 255, 0.08)');
      beamGrad.addColorStop(0.5, 'rgba(41, 148, 167, 0.03)');
      beamGrad.addColorStop(1, 'rgba(27, 25, 78, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(width * 0.35, 0);
      ctx.lineTo(width * 0.65, 0);
      ctx.lineTo(width * 0.9, height);
      ctx.lineTo(width * 0.1, height);
      ctx.closePath();
      ctx.fill();

      // Draw floating frost particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulse) * 0.25);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Occasional electric flash on voltage glitch
      if (voltageGlitch && Math.random() > 0.85) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.12)';
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [voltageGlitch]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Top Icicles / Stalactites Silhouette SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-28 sm:h-36 opacity-85 filter drop-shadow-[0_12px_15px_rgba(0,255,255,0.25)]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0 H1440 V70 
             L1400 130 L1370 65 L1320 180 L1280 80 L1230 150 L1180 60 
             L1120 200 L1070 90 L1010 170 L950 50 L890 210 L840 75 
             L780 160 L720 40 L660 190 L610 80 L550 145 L490 60 
             L430 220 L370 90 L310 160 L260 70 L200 190 L150 75 
             L90 140 L40 60 L0 180 Z"
          fill="#1C1A4B"
        />
        <path
          d="M0 0 H1440 V50 
             L1410 110 L1380 45 L1330 150 L1290 60 L1240 120 L1190 40 
             L1130 170 L1080 70 L1020 140 L960 30 L900 180 L850 55 
             L790 130 L730 20 L670 160 L620 60 L560 120 L500 40 
             L440 180 L380 70 L320 130 L270 50 L210 160 L160 55 
             L100 110 L50 40 L0 140 Z"
          fill="#1B194E"
          stroke="#00FFFF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Cavern Bottom Frost & Stalagmites Silhouette */}
      <svg
        className="absolute bottom-10 left-0 w-full h-24 sm:h-32 opacity-75 filter drop-shadow-[0_-8px_12px_rgba(41,148,167,0.3)]"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 180 H1440 V130 
             L1390 70 L1350 140 L1290 40 L1240 130 L1180 80 L1130 150 
             L1070 30 L1020 120 L960 60 L910 160 L850 20 L800 110 
             L740 70 L690 140 L630 10 L580 120 L520 70 L470 150 
             L410 20 L360 130 L300 60 L250 140 L190 40 L140 130 
             L80 70 L30 150 L0 60 Z"
          fill="#1C1A4B"
          stroke="#2994A7"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
      </svg>

      {/* Glowing ice crystal accents */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-retroblue-cyan shadow-[0_0_15px_#00FFFF] animate-ping" />
      <div className="absolute top-1/3 right-16 w-2.5 h-2.5 rounded-full bg-retropink-neon shadow-[0_0_15px_#FF00AA] animate-pulse" />
      <div className="absolute bottom-28 left-1/4 w-2 h-2 rounded-full bg-retrogreen-neon shadow-[0_0_12px_#00FF00] animate-pulse" />
    </div>
  );
};
