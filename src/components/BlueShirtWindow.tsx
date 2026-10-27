import React, { useState, useEffect } from 'react';
import { soundFX } from '../services/sound';
import { ShieldAlert, Zap, Binary, Sparkles, Gamepad2 } from 'lucide-react';

interface BlueShirtWindowProps {
  onStart: () => void;
  onPlayMinigame?: () => void;
  isDesktop?: boolean;
}

export const BlueShirtWindow: React.FC<BlueShirtWindowProps> = ({ onStart, onPlayMinigame, isDesktop = false }) => {
  const [binaryStream, setBinaryStream] = useState<string>('01000010 01001100 01010101 01000101');
  const [booting, setBooting] = useState<boolean>(false);

  useEffect(() => {
    const cipherChars = 'BLUESHIRT92WENOTIARCADE';
    const interval = setInterval(() => {
      let rand = '';
      for (let i = 0; i < 4; i++) {
        rand += cipherChars[Math.floor(Math.random() * cipherChars.length)];
      }
      setBinaryStream(`HEX:${Math.floor(Math.random() * 0xffff).toString(16).toUpperCase()} // CIPHER: ${rand}`);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    soundFX.playClick();
    soundFX.playBootChime();
    setBooting(true);
    setTimeout(() => {
      onStart();
    }, 850);
  };

  const handlePlayMinigameClick = () => {
    soundFX.playClick();
    soundFX.playBootChime();
    setBooting(true);
    setTimeout(() => {
      if (onPlayMinigame) {
        onPlayMinigame();
      } else {
        onStart();
      }
    }, 850);
  };

  return (
    <div className={`relative z-20 max-w-xl w-full mx-4 transition-all duration-500 ${booting ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}>
      {/* Outer Windows Beveled Window Frame */}
      <div className="bg-retropurple-900 border-2 border-t-retropurple-100 border-l-retropurple-100 border-b-retropurple-700 border-r-retropurple-700 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(41,148,167,0.35)] font-mono text-white">
        
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-retroblue-midnight via-retropurple-500 to-retroblue-teal px-3 py-1.5 flex items-center justify-between border-b-2 border-retropurple-700 select-none">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-retroblue-cyan border border-white flex items-center justify-center text-[10px] text-black font-black font-pixel">
              B
            </div>
            <span className="font-pixel text-[11px] tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              BLUE_SHIRT.EXE - MACHINE #92 CIPHER
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => soundFX.playClick()}
              className="w-5 h-5 bg-retropurple-500 bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropurple-300"
              title="Minimize"
            >
              _
            </button>
            <button
              onClick={() => soundFX.playClick()}
              className="w-5 h-5 bg-retropurple-500 bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropurple-300"
              title="Maximize"
            >
              □
            </button>
            <button
              onClick={() => soundFX.playClick()}
              className="w-5 h-5 bg-retropink-neon bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropink-rose"
              title="Close (Locked)"
            >
              ×
            </button>
          </div>
        </div>

        {/* Menu Bar Strip */}
        <div className="bg-retropurple-700/80 px-3 py-1 text-xs border-b border-retropurple-500 flex gap-4 text-retropurple-100 select-none">
          <span className="hover:text-retroblue-cyan cursor-pointer">File</span>
          <span className="hover:text-retroblue-cyan cursor-pointer">Decrypt</span>
          <span className="hover:text-retroblue-cyan cursor-pointer">EXUN Logs</span>
          <span className="hover:text-retroblue-cyan cursor-pointer">Help</span>
        </div>

        {/* Main Body */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-retropurple-900 to-[#121133] space-y-6">
          
          {/* Header Badge */}
          <div className="flex items-center justify-between border-b border-retropurple-500/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-retrogreen-dark/30 border border-retrogreen-bright text-retrogreen-neon text-[10px] font-pixel">
                EXUN ARCHIVE #92-WENOTI
              </span>
              <span className="text-xs text-retropink-soft font-mono flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-retropink-neon" />
                CLASSIFIED
              </span>
            </div>
            <span className="text-[10px] text-retroyellow-cream font-mono">
              OCTOBER 22, 199X
            </span>
          </div>

          {/* Elven Silhouette in Blue Shirt Graphic Frame */}
          <div className="bevel-inset bg-[#0d0c24] p-4 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
            {/* Visual Avatar / Blue Shirt Figure */}
            <div className="relative w-32 h-36 bg-retropurple-700/60 border border-retroblue-cyan/60 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 group">
              {/* Scanline subtle on avatar */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-retroblue-cyan/10 to-transparent animate-pulse pointer-events-none" />

              {/* Elven ears silhouette */}
              <div className="w-16 h-14 bg-retropurple-500 rounded-t-full relative flex items-center justify-center mt-2">
                {/* Left Elven Ear */}
                <div className="absolute -left-3 top-2 w-4 h-3 bg-retropurple-500 -rotate-45 rounded-l-full border-l border-retropink-pastel" />
                {/* Right Elven Ear */}
                <div className="absolute -right-3 top-2 w-4 h-3 bg-retropurple-500 rotate-45 rounded-r-full border-r border-retropink-pastel" />
                {/* Eyes glowing yellow */}
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-retroyellow-pure rounded-full shadow-[0_0_6px_#FFFF00]" />
                  <div className="w-1.5 h-1.5 bg-retroyellow-pure rounded-full shadow-[0_0_6px_#FFFF00]" />
                </div>
              </div>

              {/* The Famous Blue Shirt & Scabbard */}
              <div className="relative w-24 h-16 bg-gradient-to-b from-retroblue-cyan to-retroblue-teal border-t-2 border-white/80 rounded-t-sm shadow-[0_0_15px_rgba(0,255,255,0.6)] flex items-center justify-center">
                <span className="font-pixel text-[8px] text-black font-extrabold tracking-tighter">
                  BLUE SHIRT
                </span>
                {/* Scabbard Strap across chest */}
                <div className="absolute inset-0 border-t-4 border-amber-950 rotate-12 opacity-80" />
                {/* Leather glove icon badge */}
                <div className="absolute -bottom-1 -right-1 text-[9px] bg-retropurple-900 text-retroyellow-warm px-1 border border-retropurple-300">
                  GLOVE
                </div>
              </div>

              <div className="text-[9px] font-pixel text-retroblue-cyan mt-1">
                SUBJECT: BOILER
              </div>
            </div>

            {/* Narrative Briefing */}
            <div className="space-y-2 text-left flex-1">
              <div className="flex items-center gap-1.5 text-retroyellow-bright text-xs font-bold font-mono">
                <Binary className="w-3.5 h-3.5 text-retroyellow-pure" />
                <span>CIPHER REPORT // TARGET IDENTIFIED</span>
              </div>
              <p className="text-xs text-retropurple-100 leading-relaxed font-mono">
                A dark TV flickered on October 22. Bureaucrat <strong className="text-retropink-rose font-bold">Paul Boiler</strong> gave condolences for Teo Wenoti, but secretly plotted to raid the <strong className="text-retroblue-cyan">Wenoti Arcade on 92nd Avenue</strong>.
              </p>
              <p className="text-xs text-retropink-soft leading-relaxed font-mono">
                He cosplayed as the elven hero—<strong className="text-retroblue-cyan">leather glove, scabbard, blue shirt</strong>—to decode <span className="text-retrogreen-bright font-semibold">‘The Reckoning: Origins’</span>. But rookie agents Nano & Mega are hot on his trail.
              </p>
              <div className="text-[11px] text-retrogreen-neon font-pixel bg-black/60 px-2 py-1 border border-retrogreen-dark">
                {binaryStream}
              </div>
            </div>
          </div>

          {/* Warning / Clue Box */}
          <div className="bg-retropurple-700/40 border border-retropink-neon/40 p-3 text-xs text-retropurple-100 flex items-start gap-3">
            <Zap className="w-4 h-4 text-retropink-neon flex-shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="font-bold text-retropink-pastel font-pixel text-[10px]">
                SYSTEM NOTE:
              </span>
              <p className="mt-0.5 text-xs text-retropurple-100 font-mono">
                Someone altered the game code. The <strong className="text-retroyellow-bright">‘Character’ class is missing</strong>. Opening the workstation will reveal <span className="text-retroblue-cyan">CASE.EXE</span>, <span className="text-retropink-neon">EVIDENCE.EXE</span>, and <span className="text-retrogreen-neon">LOGS.EXE</span>.
              </p>
            </div>
          </div>

          {/* Minigame Callout & Animated Button - ONLY shown in Desktop Mode, NOT on main screen */}
          {isDesktop && (
            <div className="bg-retropink-neon/10 border-2 border-retropink-neon p-3.5 bevel-inset flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_18px_rgba(255,0,170,0.25)]">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded bg-retropink-neon/20 border border-retropink-neon flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_#FF00AA]">
                  <Gamepad2 className="w-5 h-5 text-retropink-neon animate-bounce" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] text-retroyellow-bright tracking-wide">
                      ★ RECKONING ARCADE SIMULATION
                    </span>
                    <span className="bg-retrogreen-neon text-black font-pixel text-[8px] px-1 py-0.2">
                      PLAYABLE
                    </span>
                  </div>
                  <p className="text-xs text-retropurple-100 font-mono mt-0.5 leading-snug">
                    Step into the world by playing a small minigame &mdash; test the glitching arcade machine yourself!
                  </p>
                </div>
              </div>

              <button
                onClick={handlePlayMinigameClick}
                onMouseEnter={() => soundFX.playSeek()}
                className="flex-shrink-0 px-4 py-2 bg-retropink-neon hover:bg-retropink-rose active:scale-95 text-black font-pixel text-[11px] bevel-button transition-all flex items-center gap-2 shadow-[0_0_15px_#FF00AA] animate-pulse cursor-pointer hover:shadow-[0_0_22px_#FF00AA]"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                PLAY MINIGAME
              </button>
            </div>
          )}

          {/* Giant Retro Start Button */}
          <div className="pt-1 text-center">
            <button
              onClick={handleStartClick}
              onMouseEnter={() => soundFX.playSeek()}
              className="w-full sm:w-auto px-8 py-3.5 bg-retrogreen-dark hover:bg-retrogreen-bright active:bg-retrogreen-medium text-black font-pixel text-xs sm:text-sm tracking-wider uppercase bevel-outset-neon transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(0,255,0,0.5)] cursor-pointer flex items-center justify-center gap-3 mx-auto"
            >
              <Sparkles className="w-4 h-4 text-black animate-spin" />
              <span>
                {isDesktop
                  ? (booting ? 'CLOSING...' : 'CLOSE ARCHIVE')
                  : (booting ? 'DECRYPTING ARCHIVE...' : 'START INVESTIGATION')}
              </span>
              <span className="text-xs bg-black text-retrogreen-neon px-1.5 py-0.5 border border-retrogreen-neon">
                EXE
              </span>
            </button>

            <p className="text-[10px] text-retropurple-100/70 mt-2 font-mono">
              {isDesktop
                ? 'Return to the desktop workstation.'
                : 'Press START to unlock desktop icons, audio transcripts, and arcade code.'}
            </p>
          </div>

        </div>

        {/* Status Bar */}
        <div className="bg-retropurple-700 px-3 py-1 text-[11px] text-retropurple-100 flex items-center justify-between border-t border-retropurple-500 font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-retrogreen-neon animate-pulse" />
            <span>EXUN NET: CONNECTED [92nd AVE]</span>
          </div>
          <span>MEMORY: 640KB OK</span>
        </div>

      </div>
    </div>
  );
};
