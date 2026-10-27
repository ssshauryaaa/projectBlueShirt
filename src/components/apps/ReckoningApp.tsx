import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundFX } from '../../services/sound';
import { 
  Gamepad2, Eye, Flame, RotateCcw, Coins, ArrowLeft, ArrowRight, 
  ArrowUp, Swords, Heart, Trophy, Sparkles
} from 'lucide-react';

interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  isAttacking: boolean;
  attackTimer: number;
  invincibleTimer: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  width: number;
  height: number;
  type: 'glitch' | 'spark';
}

interface Item {
  id: number;
  x: number;
  y: number;
  letter: string;
  collected: boolean;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const ReckoningApp: React.FC = () => {
  const [view, setView] = useState<'game' | 'continue' | 'code' | 'victory'>('game');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('reckoning_hiscore') || '15400', 10);
  });
  const [lives, setLives] = useState<number>(3);
  const [cipherFound, setCipherFound] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(9);
  const [fateChosen, setFateChosen] = useState<'none' | 'accept' | 'fight' | 'expired'>('none');
  const [cutToBlack, setCutToBlack] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keyboard state
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean; attack: boolean }>({
    left: false,
    right: false,
    jump: false,
    attack: false,
  });

  // Game state ref
  const gameState = useRef<{
    player: Player;
    platforms: Platform[];
    enemies: Enemy[];
    items: Item[];
    particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number }>;
    scrollX: number;
    enemyTimer: number;
    gameWon: boolean;
    gameOver: boolean;
  }>({
    player: {
      x: 60,
      y: 200,
      vx: 0,
      vy: 0,
      width: 24,
      height: 36,
      isGrounded: false,
      facing: 'right',
      isAttacking: false,
      attackTimer: 0,
      invincibleTimer: 0,
    },
    platforms: [
      { x: 0, y: 310, w: 1400, h: 40 }, // Ground floor
      { x: 120, y: 240, w: 120, h: 16 },
      { x: 280, y: 190, w: 130, h: 16 },
      { x: 450, y: 230, w: 110, h: 16 },
      { x: 600, y: 170, w: 140, h: 16 },
      { x: 790, y: 220, w: 130, h: 16 },
      { x: 960, y: 160, w: 140, h: 16 },
      { x: 1150, y: 210, w: 160, h: 16 },
    ],
    enemies: [
      { id: 1, x: 320, y: 160, vx: -1.2, width: 20, height: 20, type: 'glitch' },
      { id: 2, x: 640, y: 140, vx: 1.5, width: 20, height: 20, type: 'glitch' },
      { id: 3, x: 820, y: 190, vx: -1.5, width: 18, height: 18, type: 'spark' },
      { id: 4, x: 1000, y: 130, vx: 1.2, width: 20, height: 20, type: 'glitch' },
      { id: 5, x: 500, y: 280, vx: -1.8, width: 22, height: 22, type: 'glitch' },
      { id: 6, x: 900, y: 280, vx: 2.0, width: 18, height: 18, type: 'spark' },
    ],
    items: [
      { id: 1, x: 160, y: 205, letter: 'B', collected: false },
      { id: 2, x: 330, y: 155, letter: 'L', collected: false },
      { id: 3, x: 490, y: 195, letter: 'U', collected: false },
      { id: 4, x: 650, y: 135, letter: 'E', collected: false },
      { id: 5, x: 840, y: 185, letter: 'S', collected: false },
      { id: 6, x: 1010, y: 125, letter: 'H', collected: false },
      { id: 7, x: 1180, y: 175, letter: 'I', collected: false },
      { id: 8, x: 700, y: 275, letter: 'R', collected: false },
      { id: 9, x: 1100, y: 275, letter: 'T', collected: false },
    ],
    particles: [],
    scrollX: 0,
    enemyTimer: 0,
    gameWon: false,
    gameOver: false,
  });

  const resetGame = useCallback(() => {
    soundFX.playBootChime();
    setScore(0);
    setLives(3);
    setCipherFound([]);
    setIsPaused(false);
    setCountdown(9);
    setFateChosen('none');
    setCutToBlack(false);
    setView('game');

    gameState.current.player = {
      x: 60,
      y: 200,
      vx: 0,
      vy: 0,
      width: 24,
      height: 36,
      isGrounded: false,
      facing: 'right',
      isAttacking: false,
      attackTimer: 0,
      invincibleTimer: 0,
    };
    gameState.current.scrollX = 0;
    gameState.current.gameOver = false;
    gameState.current.gameWon = false;
    gameState.current.particles = [];
    gameState.current.items.forEach((item) => (item.collected = false));
    gameState.current.enemies = [
      { id: 1, x: 320, y: 160, vx: -1.2, width: 20, height: 20, type: 'glitch' },
      { id: 2, x: 640, y: 140, vx: 1.5, width: 20, height: 20, type: 'glitch' },
      { id: 3, x: 820, y: 190, vx: -1.5, width: 18, height: 18, type: 'spark' },
      { id: 4, x: 1000, y: 130, vx: 1.2, width: 20, height: 20, type: 'glitch' },
      { id: 5, x: 500, y: 280, vx: -1.8, width: 22, height: 22, type: 'glitch' },
      { id: 6, x: 900, y: 280, vx: 2.0, width: 18, height: 18, type: 'spark' },
    ];
  }, []);

  // Trigger victory sequence when all 9 cipher disks are gathered and portal is reached
  const triggerVictory = useCallback(() => {
    soundFX.playBootChime();
    soundFX.playCoin();
    setScore((prev) => {
      const bonus = prev + 5000;
      if (bonus > highScore) {
        setHighScore(bonus);
        localStorage.setItem('reckoning_hiscore', String(bonus));
      }
      return bonus;
    });
    setView('victory');
  }, [highScore]);

  // Trigger continue screen when lives hit 0 or incomplete portal reached
  const triggerContinueScreen = useCallback(() => {
    soundFX.playWarble();
    setView('continue');
    setCountdown(9);
    setFateChosen('none');
    setCutToBlack(false);
  }, []);

  // Continue screen countdown timer
  useEffect(() => {
    if (view !== 'continue' || fateChosen !== 'none' || cutToBlack) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          soundFX.playCountdownBeep(true);
          setFateChosen('expired');
          setTimeout(() => setCutToBlack(true), 1200);
          return 0;
        }
        soundFX.playCountdownBeep(false);
        return prev - 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [view, fateChosen, cutToBlack]);

  const handleFate = (choice: 'accept' | 'fight') => {
    soundFX.playWarble();
    setFateChosen(choice);
    setTimeout(() => {
      soundFX.playGlitchBuzz();
      setCutToBlack(true);
    }, 1500);
  };

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view !== 'game') return;

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = true;
      }
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        e.preventDefault();
        keysRef.current.jump = true;
      }
      if (e.code === 'KeyZ' || e.code === 'KeyJ' || e.code === 'Enter') {
        e.preventDefault();
        keysRef.current.attack = true;
      }
      if (e.code === 'KeyP') {
        setIsPaused((p) => !p);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = false;
      }
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        keysRef.current.jump = false;
      }
      if (e.code === 'KeyZ' || e.code === 'KeyJ' || e.code === 'Enter') {
        keysRef.current.attack = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [view]);

  // Main 60FPS Game Loop
  useEffect(() => {
    if (view !== 'game') return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      if (!isPaused) {
        const { player, platforms, enemies, items, particles } = gameState.current;

        // 1. Player horizontal movement
        const moveSpeed = 3.6;
        if (keysRef.current.left) {
          player.vx = -moveSpeed;
          player.facing = 'left';
        } else if (keysRef.current.right) {
          player.vx = moveSpeed;
          player.facing = 'right';
        } else {
          player.vx *= 0.75;
          if (Math.abs(player.vx) < 0.1) player.vx = 0;
        }

        // 2. Player jump
        if (keysRef.current.jump && player.isGrounded) {
          player.vy = -10.5;
          player.isGrounded = false;
          soundFX.playJump();
        }

        // 3. Player attack (Slash blade)
        if (keysRef.current.attack && player.attackTimer <= 0) {
          player.isAttacking = true;
          player.attackTimer = 16;
          soundFX.playLaser();
        }

        if (player.attackTimer > 0) {
          player.attackTimer--;
          if (player.attackTimer <= 0) {
            player.isAttacking = false;
          }
        }

        if (player.invincibleTimer > 0) {
          player.invincibleTimer--;
        }

        // 4. Gravity
        player.vy += 0.52;
        if (player.vy > 12) player.vy = 12;

        player.x += player.vx;
        player.y += player.vy;

        // Keep player inside level bounds
        if (player.x < 10) player.x = 10;
        
        // Portal 92 Reach / Escape Check
        if (player.x > 1280) {
          const allCipherCollected = gameState.current.items.every((item) => item.collected);
          if (allCipherCollected) {
            triggerVictory();
            return;
          } else {
            // Reached portal without complete cipher - caught in empty class trap!
            triggerContinueScreen();
            return;
          }
        }

        // 5. Platform collision
        player.isGrounded = false;
        platforms.forEach((plat) => {
          if (
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.w &&
            player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + 14 &&
            player.vy >= 0
          ) {
            player.y = plat.y - player.height;
            player.vy = 0;
            player.isGrounded = true;
          }
        });

        // 6. Camera scroll follows player smoothly
        const targetScroll = Math.max(0, Math.min(760, player.x - 280));
        gameState.current.scrollX += (targetScroll - gameState.current.scrollX) * 0.1;

        // 7. Enemy mechanics & collision
        enemies.forEach((enemy) => {
          enemy.x += enemy.vx;
          if (enemy.x < 10 || enemy.x > 1350) enemy.vx *= -1;

          // Check if enemy hit by player slash
          if (player.isAttacking) {
            const attackBox = {
              x: player.facing === 'right' ? player.x + player.width : player.x - 30,
              y: player.y + 5,
              w: 30,
              h: 26,
            };

            if (
              attackBox.x < enemy.x + enemy.width &&
              attackBox.x + attackBox.w > enemy.x &&
              attackBox.y < enemy.y + enemy.height &&
              attackBox.y + attackBox.h > enemy.y
            ) {
              // Enemy destroyed
              enemy.x = -999;
              soundFX.playHit();
              setScore((s) => {
                const next = s + 250;
                if (next > highScore) {
                  setHighScore(next);
                  localStorage.setItem('reckoning_hiscore', String(next));
                }
                return next;
              });

              // Sparks burst
              for (let i = 0; i < 8; i++) {
                particles.push({
                  x: enemy.x + 10,
                  y: enemy.y + 10,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  color: enemy.type === 'spark' ? '#00FFFF' : '#FF00AA',
                  life: 18,
                });
              }
            }
          }

          // Check if player hit by enemy
          if (
            player.invincibleTimer <= 0 &&
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
          ) {
            // Player takes damage
            player.invincibleTimer = 45;
            soundFX.playHit();
            setLives((l) => {
              const next = l - 1;
              if (next <= 0) {
                triggerContinueScreen();
              }
              return next;
            });
          }
        });

        // 8. Item collection (Cipher letters)
        items.forEach((item) => {
          if (
            !item.collected &&
            player.x < item.x + 20 &&
            player.x + player.width > item.x &&
            player.y < item.y + 20 &&
            player.y + player.height > item.y
          ) {
            item.collected = true;
            soundFX.playCoin();
            setCipherFound((prev) => [...prev, item.letter]);
            setScore((s) => {
              const next = s + 500;
              if (next > highScore) {
                setHighScore(next);
                localStorage.setItem('reckoning_hiscore', String(next));
              }
              return next;
            });

            // Sparkles
            for (let i = 0; i < 6; i++) {
              particles.push({
                x: item.x + 10,
                y: item.y + 10,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color: '#FFFF00',
                life: 15,
              });
            }
          }
        });

        // 9. Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      // --- RENDERING ---
      const { player, platforms, enemies, items, particles, scrollX } = gameState.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep arcade void background
      ctx.fillStyle = '#0a091d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax background grid & glitch stalactites
      ctx.save();
      ctx.translate(-scrollX * 0.4, 0);

      // Background cavern lines
      ctx.strokeStyle = '#1C1A4B';
      ctx.lineWidth = 1;
      for (let x = 0; x < 2000; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      ctx.restore();

      // Main world rendering
      ctx.save();
      ctx.translate(-scrollX, 0);

      // Draw Platforms
      platforms.forEach((plat) => {
        // Platform body
        ctx.fillStyle = '#1B194E';
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

        // Platform top neon edge
        ctx.fillStyle = '#2994A7';
        ctx.fillRect(plat.x, plat.y, plat.w, 3);
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(plat.x, plat.y, plat.w, 1);

        // Platform bottom shadow
        ctx.fillStyle = '#121033';
        ctx.fillRect(plat.x, plat.y + plat.h - 2, plat.w, 2);
      });

      // Draw Teo's Empty Character Altar / Goal at level end (x: 1300)
      ctx.fillStyle = 'rgba(255, 0, 170, 0.2)';
      ctx.fillRect(1280, 160, 80, 150);
      ctx.strokeStyle = '#FF00AA';
      ctx.lineWidth = 2;
      ctx.strokeRect(1280, 160, 80, 150);
      ctx.fillStyle = '#FFFF00';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillText('PORTAL 92', 1285, 185);
      ctx.fillStyle = '#00FFFF';
      ctx.fillText('EMPTY CLASS', 1282, 215);

      // Draw Items (Cipher Disks)
      items.forEach((item) => {
        if (item.collected) return;
        const bob = Math.sin(Date.now() * 0.006 + item.id) * 3;
        
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(item.x + 10, item.y + 10 + bob, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px "Press Start 2P", monospace';
        ctx.fillText(item.letter, item.x + 6, item.y + 14 + bob);
      });

      // Draw Enemies
      enemies.forEach((enemy) => {
        if (enemy.x < -100) return;
        if (enemy.type === 'glitch') {
          ctx.fillStyle = '#FF00AA';
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
          ctx.fillStyle = '#00FFFF';
          ctx.fillRect(enemy.x + 3, enemy.y + 3, enemy.width - 6, enemy.height - 6);
          ctx.fillStyle = '#000';
          ctx.fillRect(enemy.x + 6, enemy.y + 6, 3, 3);
          ctx.fillRect(enemy.x + 12, enemy.y + 6, 3, 3);
        } else {
          // Spark
          ctx.fillStyle = '#00FF00';
          ctx.beginPath();
          ctx.arc(enemy.x + 9, enemy.y + 9, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(enemy.x + 9, enemy.y + 9, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      });

      // Draw Player: The Elven Hero in the Blue Shirt!
      if (player.invincibleTimer % 4 < 2) {
        ctx.save();
        ctx.translate(player.x, player.y);

        // Elven Hair / Head
        ctx.fillStyle = '#FFE88B'; // Golden/blonde elven hair
        ctx.fillRect(4, 0, 16, 12);
        // Face
        ctx.fillStyle = '#FECEE4';
        ctx.fillRect(6, 4, 12, 10);
        // Eyes
        ctx.fillStyle = '#1D1F53';
        if (player.facing === 'right') {
          ctx.fillRect(13, 7, 2, 2);
        } else {
          ctx.fillRect(8, 7, 2, 2);
        }
        // Elven ear tip
        ctx.fillStyle = '#FECEE4';
        if (player.facing === 'right') {
          ctx.fillRect(4, 6, 3, 2);
        } else {
          ctx.fillRect(17, 6, 3, 2);
        }

        // The Famous Bright Blue Shirt!
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(2, 14, 20, 14);
        ctx.fillStyle = '#2994A7';
        ctx.fillRect(4, 16, 16, 10);

        // Scabbard strap across chest
        ctx.strokeStyle = '#4A2810';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(3, 14);
        ctx.lineTo(21, 26);
        ctx.stroke();

        // Right Hand: The Leather Glove
        ctx.fillStyle = '#613915';
        if (player.facing === 'right') {
          ctx.fillRect(18, 20, 5, 5);
        } else {
          ctx.fillRect(1, 20, 5, 5);
        }

        // Pants & Boots
        ctx.fillStyle = '#1C1A4B';
        ctx.fillRect(5, 28, 5, 8);
        ctx.fillRect(14, 28, 5, 8);
        ctx.fillStyle = '#31305F';
        ctx.fillRect(4, 33, 6, 3);
        ctx.fillRect(14, 33, 6, 3);

        // Sword Slash Arc if attacking
        if (player.isAttacking) {
          ctx.fillStyle = '#00FFFF';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (player.facing === 'right') {
            ctx.arc(26, 18, 18, -Math.PI / 3, Math.PI / 3);
          } else {
            ctx.arc(-4, 18, 18, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
          }
          ctx.stroke();
        }

        ctx.restore();
      }

      ctx.restore();

      // Draw Top HUD on canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, canvas.width, 24);

      ctx.fillStyle = '#00FF00';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(`1UP: ${String(score).padStart(6, '0')}`, 10, 16);

      ctx.fillStyle = '#FFFF00';
      ctx.fillText(`HI: ${String(highScore).padStart(6, '0')}`, 160, 16);

      ctx.fillStyle = '#00FFFF';
      if (cipherFound.length === 9) {
        ctx.fillStyle = '#00FF00';
        ctx.fillText(`CIPHER 9/9 COMPLETE! ENTER PORTAL 92!`, 250, 16);
      } else {
        ctx.fillText(`CIPHER: [${cipherFound.join(' ')}] (${cipherFound.length}/9)`, 280, 16);
      }

      ctx.fillStyle = '#FF00AA';
      ctx.fillText(`STAGE: 92-AVE`, 540, 16);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [view, isPaused, highScore, score, triggerContinueScreen, triggerVictory, cipherFound.length]);

  return (
    <div className="space-y-3 font-mono text-xs text-retropurple-100 select-none">
      {/* App Header & Navigation */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-retroblue-cyan" />
          <h2 className="text-sm font-pixel text-retroblue-cyan">
            THE RECKONING: ORIGINS [ARCADE V1.04]
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setView('game');
            }}
            className={`px-2.5 py-1 text-[10px] font-pixel bevel-button ${
              view === 'game'
                ? 'bg-retroblue-teal text-black font-bold'
                : 'bg-retropurple-700 text-white hover:bg-retropurple-500'
            }`}
          >
            PLAY GAME
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setView('continue');
            }}
            className={`px-2.5 py-1 text-[10px] font-pixel bevel-button ${
              view === 'continue'
                ? 'bg-retropink-neon text-black font-bold'
                : 'bg-retropurple-700 text-white hover:bg-retropurple-500'
            }`}
          >
            CONTINUE SCREEN
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setView('code');
            }}
            className={`px-2.5 py-1 text-[10px] font-pixel bevel-button ${
              view === 'code'
                ? 'bg-retroyellow-pure text-black font-bold'
                : 'bg-retropurple-700 text-white hover:bg-retropurple-500'
            }`}
          >
            CODE INSPECTOR
          </button>
        </div>
      </div>

      {/* VIEW 1: PLAYABLE ARCADE GAME */}
      {view === 'game' && (
        <div className="space-y-2">
          {/* Top Arcade Status Bar */}
          <div className="bg-black border border-retropurple-700 p-2 flex items-center justify-between text-[10px] font-pixel">
            <div className="flex items-center gap-3">
              <span className="text-retropink-neon flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-retropink-neon" /> LIVES: {lives}
              </span>
              <span className="text-retrogreen-neon">
                SCORE: {String(score).padStart(6, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-retroyellow-cream hidden sm:inline">
                REACH PORTAL 92 AT END OF STAGE
              </span>
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="px-2 py-0.5 bg-retropurple-700 text-white bevel-button hover:bg-retropurple-500"
              >
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            </div>
          </div>

          {/* Canvas Screen */}
          <div className="relative border-4 border-retropurple-700 bg-black rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.9)]">
            <canvas
              ref={canvasRef}
              width={660}
              height={340}
              className="w-full h-auto block max-h-[360px]"
            />
            {/* CRT scanlines overlay on cabinet screen */}
            <div className="absolute inset-0 crt-lines opacity-35 pointer-events-none" />

            {/* Paused Overlay */}
            {isPaused && (
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center font-pixel text-retroyellow-pure text-sm">
                <span>- PAUSED -</span>
                <span className="text-[9px] text-retropurple-100 mt-2 font-mono">
                  PRESS 'P' OR CLICK RESUME
                </span>
              </div>
            )}
          </div>

          {/* Arcade Cabinet Physical Control Panel */}
          <div className="bg-retropurple-900 border-2 border-retropurple-500 p-3 bevel-outset flex flex-wrap items-center justify-between gap-3">
            {/* On-Screen D-Pad / Movement */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-pixel text-retropurple-300 mr-1 hidden sm:inline">
                MOVE:
              </span>
              <button
                onMouseDown={() => (keysRef.current.left = true)}
                onMouseUp={() => (keysRef.current.left = false)}
                onTouchStart={() => (keysRef.current.left = true)}
                onTouchEnd={() => (keysRef.current.left = false)}
                className="w-9 h-9 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center text-white active:bg-retroblue-teal"
                title="Move Left (A / Left Arrow)"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onMouseDown={() => (keysRef.current.jump = true)}
                onMouseUp={() => (keysRef.current.jump = false)}
                onTouchStart={() => (keysRef.current.jump = true)}
                onTouchEnd={() => (keysRef.current.jump = false)}
                className="w-9 h-9 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center text-white active:bg-retrogreen-neon active:text-black"
                title="Jump (W / Space / Up Arrow)"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onMouseDown={() => (keysRef.current.right = true)}
                onMouseUp={() => (keysRef.current.right = false)}
                onTouchStart={() => (keysRef.current.right = true)}
                onTouchEnd={() => (keysRef.current.right = false)}
                className="w-9 h-9 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center text-white active:bg-retroblue-teal"
                title="Move Right (D / Right Arrow)"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons: Slash & Jump */}
            <div className="flex items-center gap-2">
              <button
                onMouseDown={() => (keysRef.current.attack = true)}
                onMouseUp={() => (keysRef.current.attack = false)}
                onTouchStart={() => (keysRef.current.attack = true)}
                onTouchEnd={() => (keysRef.current.attack = false)}
                className="px-4 py-2 bg-retroblue-teal hover:bg-retroblue-cyan hover:text-black text-white bevel-button font-pixel text-[10px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                title="Slash Blade (Z / J / Enter)"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>[A] SLASH</span>
              </button>

              <button
                onMouseDown={() => (keysRef.current.jump = true)}
                onMouseUp={() => (keysRef.current.jump = false)}
                onTouchStart={() => (keysRef.current.jump = true)}
                onTouchEnd={() => (keysRef.current.jump = false)}
                className="px-4 py-2 bg-retrogreen-dark hover:bg-retrogreen-neon hover:text-black text-white bevel-button font-pixel text-[10px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,0,0.4)]"
                title="Jump (W / Space)"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>[B] JUMP</span>
              </button>
            </div>

            {/* Reset / Insert Coin */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetGame}
                className="px-3 py-1.5 bg-retropink-neon hover:bg-retropink-rose text-black bevel-button font-pixel text-[9px] flex items-center gap-1"
                title="Reset Level"
              >
                <Coins className="w-3 h-3 text-black" />
                <span>RESTART</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-retropurple-100/70 font-mono flex items-center justify-between px-1">
            <span>KEYBOARD: [A / D] MOVE • [SPACE / W] JUMP • [Z / J] SLASH • [P] PAUSE</span>
            <span className="text-retroyellow-warm">COLLECT CIPHER DISKS B-L-U-E-S-H-I-R-T</span>
          </div>
        </div>
      )}

      {/* VIEW 2: THE ICONIC CLIMAX CONTINUE SCREEN */}
      {view === 'continue' && (
        <div className="relative bevel-inset bg-black p-4 min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden border border-retropurple-700">
          <div className="absolute inset-0 crt-lines opacity-40 pointer-events-none" />

          {cutToBlack ? (
            <div className="space-y-4 z-10 max-w-md animate-fadeIn">
              <div className="w-16 h-16 mx-auto border-2 border-white/20 flex items-center justify-center text-retropink-rose font-pixel text-2xl animate-pulse">
                ?
              </div>
              <h3 className="font-pixel text-sm sm:text-base text-white tracking-widest uppercase">
                ...IT CUTS TO BLACK BEFORE WE WILL EVER KNOW.
              </h3>
              <p className="text-xs text-retropurple-100 leading-relaxed font-mono">
                Two Schrödinger’s cats remain suspended within the rogue developer's dream. Did Boiler and Nano defeat the game engine, or become eternal sprites in Teo Wenoti’s vengeance?
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-retrogreen-neon text-black font-pixel text-[10px] bevel-button hover:bg-retrogreen-bright flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> INSERT COIN & PLAY AGAIN
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 z-10 max-w-lg w-full">
              <div className="space-y-1">
                <span className="text-[10px] font-pixel text-retroblue-cyan tracking-widest">
                  WENOTI ARCADE // CABINET #01
                </span>
                <h1 className="text-xl sm:text-2xl font-pixel text-retropink-neon tracking-wide drop-shadow-[0_0_12px_#FF00AA]">
                  CONTINUE THE GAME?..
                </h1>
              </div>

              {/* Countdown Ticker */}
              <div className="flex flex-col items-center justify-center">
                <div className="font-pixel text-5xl sm:text-6xl text-retroyellow-pure drop-shadow-[0_0_20px_#FFFF00] animate-bounce">
                  0{countdown}
                </div>
                <span className="text-[9px] font-pixel text-retropurple-100 mt-1">
                  DIMENSIONAL COLLAPSE IMMINENT
                </span>
              </div>

              {/* Boiler and Nano in the void */}
              <div className="flex justify-center items-center gap-8 py-2">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-14 bg-retroblue-midnight border border-retroblue-cyan flex flex-col items-center justify-center relative shadow-[0_0_15px_#00FFFF]">
                    <div className="w-4 h-4 bg-retroyellow-bright rounded-full mt-1" />
                    <div className="w-6 h-5 bg-retroblue-cyan mt-1" />
                    <span className="text-[7px] text-black font-pixel font-bold absolute bottom-0.5">
                      BOILER
                    </span>
                  </div>
                  <span className="text-[9px] text-retropurple-100 mt-1">Cosplayer</span>
                </div>

                <div className="text-retropink-neon font-pixel text-xs animate-pulse">
                  VS
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-14 bg-retropurple-700 border border-retropink-neon flex flex-col items-center justify-center relative shadow-[0_0_15px_#FF00AA]">
                    <div className="w-4 h-4 bg-retropink-pastel rounded-full mt-1" />
                    <div className="w-6 h-5 bg-black mt-1" />
                    <span className="text-[7px] text-white font-pixel font-bold absolute bottom-0.5">
                      NANO
                    </span>
                  </div>
                  <span className="text-[9px] text-retropurple-100 mt-1">EEUN Agent</span>
                </div>
              </div>

              {/* Decision Buttons */}
              {fateChosen === 'none' ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={resetGame}
                    className="px-4 py-2.5 bg-retrogreen-neon hover:bg-retrogreen-bright text-black bevel-button font-pixel text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                  >
                    <Coins className="w-4 h-4 text-black" />
                    INSERT COIN (25¢)
                  </button>

                  <button
                    onClick={() => handleFate('accept')}
                    className="px-4 py-2.5 bg-retropurple-700 hover:bg-retropurple-500 border border-retropurple-100 bevel-button text-white font-pixel text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4 text-retroyellow-cream" />
                    ACCEPT FATE
                  </button>

                  <button
                    onClick={() => handleFate('fight')}
                    className="px-4 py-2.5 bg-retropink-rose hover:bg-retropink-neon hover:text-black border border-retropink-neon bevel-button text-white font-pixel text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-4 h-4 text-retroyellow-bright" />
                    FIGHT GLITCH
                  </button>
                </div>
              ) : (
                <div className="font-pixel text-xs text-retroyellow-pure animate-pulse">
                  {fateChosen === 'accept' && 'THEY ACCEPTED THE DREAM... PURGING ENTITY BUFFER...'}
                  {fateChosen === 'fight' && 'THEY ARE FIGHTING THE ALGORITHM... OVERHEATING CORE...'}
                  {fateChosen === 'expired' && 'TIME EXPIRED. CONSUMPTION COMPLETE.'}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW: VICTORY SEQUENCE */}
      {view === 'victory' && (
        <div className="relative bevel-inset bg-black p-5 min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden border-2 border-retrogreen-neon shadow-[0_0_35px_rgba(0,255,0,0.5)]">
          <div className="absolute inset-0 crt-lines opacity-30 pointer-events-none" />

          <div className="space-y-4 z-10 max-w-lg w-full animate-fadeIn">
            <div className="w-16 h-16 mx-auto bg-retrogreen-neon/20 border-2 border-retrogreen-neon flex items-center justify-center text-retrogreen-neon shadow-[0_0_20px_#00FF00]">
              <Trophy className="w-8 h-8 text-retroyellow-pure animate-bounce" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-pixel text-retroblue-cyan tracking-widest">
                ARCADE MACHINE #92 // COMPILER OVERRIDE
              </div>
              <h1 className="text-lg sm:text-2xl font-pixel text-retrogreen-neon tracking-wide drop-shadow-[0_0_15px_#00FF00]">
                CIPHER DECODED: VICTORY!
              </h1>
            </div>

            <div className="p-3 bg-retropurple-900/90 border border-retroblue-cyan text-xs space-y-2">
              <div className="flex items-center justify-center gap-2 text-retroyellow-bright font-pixel text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLASS 'CHARACTER' RECONSTRUCTED</span>
              </div>
              <div className="text-retrogreen-neon font-pixel text-xs bg-black/80 py-1 border border-retrogreen-dark">
                B • L • U • E • S • H • I • R • T [9/9 DISKS FOUND]
              </div>
              <p className="text-retropurple-100 text-[11px] leading-relaxed">
                By injecting the complete <strong className="text-white">“BLUESHIRT”</strong> cipher into Portal 92, the missing character class was recompiled in real time. Teo Wenoti's dimensional vacuum collapsed safely!
              </p>
              <div className="p-2 bg-black/60 border border-retropink-rose text-retropink-soft text-[10px]">
                ⚡ <strong>Extraction Confirmed:</strong> Agent Nano, Agent Mega, and Paul Boiler were rematerialized onto the linoleum floor of Wenoti Arcade at 01:19 AM!
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 text-xs font-pixel">
              <div>
                <span className="text-retropurple-300 text-[9px] block">FINAL SCORE</span>
                <span className="text-retrogreen-neon text-sm">{String(score).padStart(6, '0')}</span>
              </div>
              <div>
                <span className="text-retropurple-300 text-[9px] block">HIGH SCORE</span>
                <span className="text-retroyellow-pure text-sm">{String(highScore).padStart(6, '0')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={resetGame}
                className="px-6 py-2.5 bg-retrogreen-neon hover:bg-retrogreen-bright text-black bevel-button font-pixel text-xs transition-all flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_rgba(0,255,0,0.6)]"
              >
                <Coins className="w-4 h-4 text-black" />
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: CODE INSPECTOR */}
      {view === 'code' && (
        <div className="bevel-inset bg-black/90 p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-retropurple-700 pb-2">
            <span className="text-retroblue-cyan font-bold">
              FILE: /src/engine/TheReckoning_Origins/character.ts
            </span>
            <span className="text-retropink-rose font-pixel text-[10px]">
              CRC ERROR: CORRUPT ENTITY TABLE
            </span>
          </div>

          <div className="bg-[#0c0a20] p-3 border border-retropurple-700/80 rounded font-mono text-[11px] leading-relaxed overflow-x-auto text-retropurple-100">
            <pre>
{`// ARCHITECT: TEO WENOTI (NuxEland Electricity Dept)
// NOTE: "Vengeance is not a bug; it is an unhandled promise."

import { Consciousness, DimensionalSocket } from './ether';

/*
 * [CRITICAL COMPILER AUDIT]
 * Paul Boiler's Discovery:
 * The 'Character' class was intentionally removed from this module.
 */

// export class Character extends Entity { ... } <-- DELETED BY TEO WENOTI

export class VengeanceProtocol {
  private socket: DimensionalSocket;

  constructor() {
    this.socket = new DimensionalSocket(92); // 92nd Avenue Node
  }

  // When a player presses Start at Wenoti Arcade:
  public onPlayerInsertCoin(player: Consciousness): void {
    // Because 'Character' class does not exist:
    // The engine requires a living vessel to instantiate the sprite.
    if (typeof Character === "undefined") {
      console.warn("No character escaped from the game.");
      
      // Bind the human player to the vacant character pointer
      this.socket.drainBioVoltage(player, 45000 /* kW */);
      this.socket.pullIntoArcadeMatrix(player);
      
      // They are now trapped forever in Teo Wenoti's dream.
      throw new TrapException("You are the character now.");
    }
  }
}`}
            </pre>
          </div>

          <div className="p-2.5 bg-retropink-neon/15 border border-retropink-neon text-xs text-retropink-soft">
            <strong className="text-white font-bold">DECRYPTED REVELATION:</strong>
            <p className="mt-1">
              No character ever escaped from the game. The Character class was intentionally left empty by Teo Wenoti so that the people who play it would get trapped forever as vengeance for how the world treated him.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
