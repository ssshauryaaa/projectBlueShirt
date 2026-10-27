import React, { useState, useEffect } from 'react';
import { soundFX } from '../../services/sound';
import { Gamepad2, Eye, Flame, RotateCcw } from 'lucide-react';

export const ReckoningApp: React.FC = () => {
  const [view, setView] = useState<'arcade' | 'code'>('arcade');
  const [countdown, setCountdown] = useState<number>(9);
  const [fateChosen, setFateChosen] = useState<'none' | 'accept' | 'fight' | 'expired'>('none');
  const [cutToBlack, setCutToBlack] = useState<boolean>(false);

  // Countdown timer for the arcade continue screen
  useEffect(() => {
    if (view !== 'arcade' || fateChosen !== 'none' || cutToBlack) return;

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

  const handleResetArcade = () => {
    soundFX.playClick();
    setCutToBlack(false);
    setFateChosen('none');
    setCountdown(9);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* App Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-retroyellow-pure" />
          <h2 className="text-sm font-pixel text-retroyellow-pure">
            THE RECKONING: ORIGINS [ROM V1.0]
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setView('arcade');
            }}
            className={`px-2.5 py-1 text-[10px] font-pixel bevel-button ${
              view === 'arcade'
                ? 'bg-retropink-neon text-black'
                : 'bg-retropurple-700 text-white hover:bg-retropurple-500'
            }`}
          >
            ARCADE SIMULATION
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setView('code');
            }}
            className={`px-2.5 py-1 text-[10px] font-pixel bevel-button ${
              view === 'code'
                ? 'bg-retroblue-cyan text-black'
                : 'bg-retropurple-700 text-white hover:bg-retropurple-500'
            }`}
          >
            CODE INSPECTOR
          </button>
        </div>
      </div>

      {view === 'arcade' ? (
        <div className="relative bevel-inset bg-black p-4 min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden border border-retropurple-700">
          
          {/* CRT scanlines inside arcade screen */}
          <div className="absolute inset-0 crt-lines opacity-40 pointer-events-none" />

          {cutToBlack ? (
            /* Cut to Black Climax Screen */
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
              <div className="pt-3">
                <button
                  onClick={handleResetArcade}
                  className="px-4 py-2 bg-retrogreen-neon text-black font-pixel text-[10px] bevel-button hover:bg-retrogreen-bright flex items-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> RE-ENTER SIMULATION
                </button>
              </div>
            </div>
          ) : (
            /* The Ominous Continue Screen */
            <div className="space-y-6 z-10 max-w-lg w-full">
              <div className="space-y-1">
                <span className="text-[10px] font-pixel text-retroblue-cyan tracking-widest">
                  WENOTI ARCADE // CABINET #01
                </span>
                <h1 className="text-xl sm:text-2xl font-pixel text-retropink-neon tracking-wide drop-shadow-[0_0_12px_#FF00AA]">
                  CONTINUE THE GAME?..
                </h1>
              </div>

              {/* Countdown Number */}
              <div className="flex flex-col items-center justify-center">
                <div className="font-pixel text-5xl sm:text-6xl text-retroyellow-pure drop-shadow-[0_0_20px_#FFFF00] animate-bounce">
                  0{countdown}
                </div>
                <span className="text-[9px] font-pixel text-retropurple-100 mt-1">
                  DIMENSIONAL COLLAPSE IMMINENT
                </span>
              </div>

              {/* The Two Schrödinger's Cats in the Void */}
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

              {/* Two Choices */}
              {fateChosen === 'none' ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => handleFate('accept')}
                    className="px-5 py-2.5 bg-retropurple-700 hover:bg-retropurple-500 border border-retropurple-100 bevel-button text-white font-pixel text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-retroyellow-cream" />
                    ACCEPT FATE
                  </button>

                  <button
                    onClick={() => handleFate('fight')}
                    className="px-5 py-2.5 bg-retrogreen-dark hover:bg-retrogreen-neon hover:text-black border border-retrogreen-bright bevel-button text-white font-pixel text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                  >
                    <Flame className="w-4 h-4 text-retroyellow-bright" />
                    FIGHT THE GLITCH
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
      ) : (
        /* The Corrupted Code Inspector */
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
