import React, { useState, useEffect } from 'react';
import { soundFX } from '../../services/sound';
import { Tv, Radio, Play, Pause, AlertCircle } from 'lucide-react';

export const NewsTvApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [staticGlitch, setStaticGlitch] = useState<boolean>(false);
  const [transcriptIndex, setTranscriptIndex] = useState<number>(0);

  const speechSegments = [
    "“We share our condolences to the family of Mr. Teo Wenoti...",
    "...He was a valued employee of the electricity department of the Government of NuxEland...",
    "...He was the planner of one of our arcades and a game development enthusiast, on the side...",
    "...We will be naming his final work, the Wenoti Arcade on 92nd Avenue.”",
    "[BROADCAST NOTE: Boiler's face remains totally expressionless. He clutches a classified blueprint under the podium.]"
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTranscriptIndex((prev) => (prev + 1) % speechSegments.length);
      if (Math.random() > 0.6) {
        soundFX.playGlitchBuzz();
        setStaticGlitch(true);
        setTimeout(() => setStaticGlitch(false), 200);
      }
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    soundFX.playClick();
    setIsPlaying(!isPlaying);
  };

  const triggerGlitch = () => {
    soundFX.playWarble();
    setStaticGlitch(true);
    setTimeout(() => setStaticGlitch(false), 500);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-retroblue-cyan" />
          <h2 className="text-sm font-pixel text-retroblue-cyan">
            NEWS_TV.EXE // NUXELAND BROADCAST ARCHIVE
          </h2>
        </div>
        <div className="text-[10px] bg-red-950/80 text-retropink-neon px-2 py-0.5 border border-retropink-neon flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-retropink-neon animate-ping" />
          BROADCAST DATE: 22-OCT-199X
        </div>
      </div>

      {/* Retro CRT TV Chassis */}
      <div className="bg-retropurple-700 p-4 sm:p-6 border-4 border-retropurple-300 bevel-outset shadow-2xl relative">
        
        {/* TV Top Rabbit Ears Antenna Representation */}
        <div className="flex justify-center -mt-8 mb-2">
          <div className="w-32 h-6 flex justify-between relative">
            <div className="w-1 h-8 bg-retropurple-100 -rotate-30 origin-bottom" />
            <div className="w-1 h-8 bg-retropurple-100 rotate-30 origin-bottom" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          {/* Curved CRT TV Screen */}
          <div className="relative w-full md:w-3/4 h-64 bg-black rounded-2xl border-4 border-[#121133] shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-4">
            
            {/* Scanlines & Glow Overlay */}
            <div className="absolute inset-0 crt-lines opacity-60 pointer-events-none" />
            {staticGlitch && (
              <div className="absolute inset-0 bg-white/20 mix-blend-difference pointer-events-none animate-glitch" />
            )}

            {/* Top Screen HUD */}
            <div className="flex justify-between items-center z-10 text-[9px] font-pixel text-retrogreen-neon">
              <span className="bg-red-600 text-white px-1.5 py-0.2 animate-pulse">● REC [NUX-7]</span>
              <span>22.OCT.199X 19:42:01</span>
            </div>

            {/* The Visual Representation of Paul Boiler */}
            <div className="flex flex-col items-center justify-center z-10 space-y-2">
              <div className="relative">
                {/* Government Official Podium */}
                <div className="w-20 h-20 bg-retropurple-900 border-2 border-white/60 flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {/* Expressionless Face of Paul Boiler */}
                  <div className="w-10 h-10 bg-slate-400 rounded-sm relative flex flex-col items-center justify-center border border-black">
                    <div className="flex gap-2.5 mb-1">
                      <div className="w-1.5 h-1 bg-black" />
                      <div className="w-1.5 h-1 bg-black" />
                    </div>
                    {/* Dead flat mouth: no expression */}
                    <div className="w-5 h-0.5 bg-black" />
                  </div>
                  {/* High uptight collar & tie */}
                  <div className="w-12 h-6 bg-slate-800 border-t border-white mt-1 flex justify-center">
                    <div className="w-2 h-4 bg-red-700" />
                  </div>
                </div>

                {/* Subtitle tag */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-retropurple-900 text-white font-pixel text-[8px] px-1.5 border border-retropurple-300 whitespace-nowrap">
                  PAUL BOILER [OFFICIAL]
                </div>
              </div>

              <div className="text-[10px] text-retroyellow-cream font-mono mt-1">
                Department of Electricity, Government of NuxEland
              </div>
            </div>

            {/* Subtitles / Teleprompter */}
            <div className="z-10 bg-black/85 p-2 border-t border-retropurple-500 min-h-[46px] flex items-center justify-center text-center">
              <p className="text-xs text-white font-mono leading-relaxed font-semibold animate-fadeIn">
                {speechSegments[transcriptIndex]}
              </p>
            </div>
          </div>

          {/* TV Right Control Panel (Knobs, Dials, Channel) */}
          <div className="w-full md:w-1/4 flex flex-col items-center justify-between h-64 bg-retropurple-900/90 p-3 border border-retropurple-500 bevel-inset space-y-3">
            <div className="text-center">
              <div className="font-pixel text-[9px] text-retropink-pastel">CHANNEL 07</div>
              <div className="font-pixel text-lg text-retroblue-cyan">NUX-TV</div>
            </div>

            {/* Knobs */}
            <div className="space-y-3 w-full">
              <button
                onClick={togglePlayback}
                className="w-full py-1.5 bg-retropurple-500 hover:bg-retropurple-300 bevel-button flex items-center justify-center gap-1.5 text-[10px] font-pixel text-white"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'PAUSE TAPE' : 'PLAY TAPE'}
              </button>

              <button
                onClick={triggerGlitch}
                className="w-full py-1.5 bg-retropink-rose hover:bg-retropink-neon hover:text-black bevel-button flex items-center justify-center gap-1.5 text-[10px] font-pixel text-white"
              >
                <Radio className="w-3.5 h-3.5" /> DE-GAUSS / GLITCH
              </button>
            </div>

            {/* Speaker Grille */}
            <div className="w-full space-y-1">
              <div className="w-full h-1 bg-retropurple-500" />
              <div className="w-full h-1 bg-retropurple-500" />
              <div className="w-full h-1 bg-retropurple-500" />
              <div className="w-full h-1 bg-retropurple-500" />
            </div>

            <div className="text-[9px] text-retropurple-100/70 text-center font-mono">
              SOLID STATE CRT • 199X
            </div>
          </div>

        </div>
      </div>

      {/* Secret Clues Analysis */}
      <div className="p-3 bg-retropurple-900 border border-retroyellow-warm text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-retroyellow-pure font-bold font-pixel text-[10px]">
          <AlertCircle className="w-3.5 h-3.5 text-retroyellow-pure" /> FORENSIC PSYCHOLOGY NOTE:
        </div>
        <p className="text-retropurple-100 leading-relaxed">
          Notice how Paul Boiler’s hands never leave the edge of the lectern. Micro-expressions indicate acute anxiety whenever he utters the words <strong className="text-white">“Wenoti Arcade on 92nd Avenue”</strong>. Hours after this broadcast, he dressed in an elven tunic to break into the arcade cabinet alone.
        </p>
      </div>
    </div>
  );
};
