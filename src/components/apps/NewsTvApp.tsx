import React, { useState, useEffect } from 'react';
import { soundFX } from '../../services/sound';
import {
  Tv, Radio, Play, Pause, AlertCircle, ChevronLeft, ChevronRight,
  Rewind, FastForward, Zap, Eye, Volume2, VolumeX
} from 'lucide-react';

const BROADCAST_SEGMENTS = [
  {
    id: 0,
    timestamp: '22.OCT.199X  19:42:01',
    speaker: 'PAUL BOILER',
    role: 'Department of Electricity, NuxEland Govt.',
    lines: [
      '\u201cWe share our deepest condolences to the family of Mr. Teo Wenoti\u2026\u201d',
      '\u201cHe was a valued employee of the electricity department of the Government of NuxEland.\u201d',
      '\u201cHe was the planner of one of our arcades, and a game development enthusiast, on the side.\u201d',
      '\u201cWe will be naming his final work \u2014 the Wenoti Arcade on 92nd Avenue \u2014 in his honour.\u201d',
    ],
    note: "Boiler's face remains totally expressionless. He clutches what appears to be a classified blueprint under the podium.",
    agentNote: 'Micro-expressions indicate acute anxiety whenever he utters "Wenoti Arcade on 92nd Avenue". His hands never leave the lectern edge. Hours after this broadcast, he dressed in an elven tunic to break into the arcade cabinet alone.',
    isSecurityCam: false,
  },
  {
    id: 1,
    timestamp: '22.OCT.199X  20:14:37',
    speaker: 'NUX-TV ANCHOR',
    role: 'NUX-TV Channel 07 \u2014 Evening News',
    lines: [
      '\u201cThe government has confirmed that the late Mr. Wenoti\u2019s arcade project will continue.\u201d',
      '\u201cA memorial evening is planned at the 92nd Avenue arcade site.\u201d',
      '\u201cCitizens are encouraged to pay their respects at the cabinet known as Machine #92.\u201d',
      '\u201cOfficials deny any irregularities surrounding Wenoti\u2019s sudden passing.\u201d',
    ],
    note: 'Source footage recovered from EXUN Archive. Tape shows signs of magnetic tampering.',
    agentNote: "The phrase 'citizens are encouraged' was reportedly scripted by Boiler's office \u2014 not the anchor's own wording. The broadcast cuts 4 seconds early compared to logged air time.",
    isSecurityCam: false,
  },
  {
    id: 2,
    timestamp: '22.OCT.199X  21:05:12',
    speaker: 'CLASSIFIED \u2014 SECURITY CAM',
    role: 'Wenoti Arcade, 92nd Ave \u2022 Camera Feed C7',
    lines: [
      '[STATIC] \u2014 \u2014 \u2014 [FOOTAGE RECOVERED]',
      'A figure in an elven tunic enters through the service corridor at 21:03.',
      'The figure approaches Machine #92 and inserts what appears to be a modified cartridge.',
      '[SIGNAL LOST \u2014 CITY-WIDE POWER SURGE DETECTED]',
    ],
    note: 'This tape was recovered from a damaged VHS cassette inside the arcade office. Duration: 4min 22sec. Much of it is corrupted.',
    agentNote: 'The elven tunic matches costume descriptions given by witnesses near 92nd Ave. Cross-reference: EVIDENCE.EXE \u2192 ITEM_07. The power surge matches city grid logs from 21:05.',
    isSecurityCam: true,
  },
];

const TICKER_TEXT = [
  'BREAKING: PAUL BOILER DELIVERS CONDOLENCES AT PRESS CONFERENCE',
  '\u25CF CITY-WIDE ELECTRICITY SURGE REPORTED 22 OCT 199X \u2014 GRID AUTHORITY INVESTIGATING',
  '\u25CF WENOTI ARCADE ON 92ND AVENUE TO BE DEDICATED IN LATE EMPLOYEE\u2019S HONOUR',
  '\u25CF MACHINE #92 "THE RECKONING: ORIGINS" \u2014 GAME CODE REPORTEDLY MISSING CHARACTER CLASS',
  '\u25CF ROOKIE AGENTS NANO & MEGA DEPLOYED \u2014 EXUN NETWORK CLASSIFIED',
  '\u25CF VHS ARCHIVE TAPE RECOVERED FROM ARCADE OFFICE \u2014 CONTENTS CLASSIFIED',
].join('     \u25C6     ');

export const NewsTvApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [staticGlitch, setStaticGlitch] = useState<boolean>(false);
  const [vhsNoise, setVhsNoise] = useState<boolean>(false);
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [segmentIndex, setSegmentIndex] = useState<number>(0);
  const [tickerOffset, setTickerOffset] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(88);
  const [showForensics, setShowForensics] = useState<boolean>(false);
  const [blinkRec, setBlinkRec] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(false);

  const segment = BROADCAST_SEGMENTS[segmentIndex];

  // Auto-advance lines
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setLineIndex((prev) => {
        const next = prev + 1;
        if (next >= segment.lines.length) {
          if (Math.random() > 0.5) {
            soundFX.playGlitchBuzz();
            setStaticGlitch(true);
            setTimeout(() => setStaticGlitch(false), 350);
          }
          return 0;
        }
        if (Math.random() > 0.65) {
          setVhsNoise(true);
          setTimeout(() => setVhsNoise(false), 130);
        }
        return next;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, segment.lines.length]);

  // Ticker scroll
  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerOffset((prev) => {
        const max = TICKER_TEXT.length * 7.4;
        return prev >= max ? 0 : prev + 1.2;
      });
    }, 25);
    return () => clearInterval(ticker);
  }, []);

  // REC blink
  useEffect(() => {
    const b = setInterval(() => setBlinkRec((p) => !p), 820);
    return () => clearInterval(b);
  }, []);

  const togglePlayback = () => { soundFX.playClick(); setIsPlaying((p) => !p); };
  const triggerGlitch = () => {
    soundFX.playWarble();
    setStaticGlitch(true); setVhsNoise(true);
    setTimeout(() => { setStaticGlitch(false); setVhsNoise(false); }, 650);
  };
  const prevSegment = () => {
    soundFX.playClick();
    setSegmentIndex((p) => (p - 1 + BROADCAST_SEGMENTS.length) % BROADCAST_SEGMENTS.length);
    setLineIndex(0);
  };
  const nextSegment = () => {
    soundFX.playClick();
    setSegmentIndex((p) => (p + 1) % BROADCAST_SEGMENTS.length);
    setLineIndex(0);
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs text-retropurple-100 bg-[#0c0b1e] select-none overflow-hidden">

      {/* ── TOP HEADER ── */}
      <div className="flex items-center justify-between bg-retropurple-900 border-b border-retropurple-600 px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-retroblue-cyan" />
          <span className="font-pixel text-[11px] text-retroblue-cyan tracking-wide">NEWS_TV.EXE</span>
          <span className="text-retropurple-400 text-[9px]">// NUXELAND BROADCAST ARCHIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-[9px] px-1.5 py-0.5 border font-pixel flex items-center gap-1 transition-all ${blinkRec ? 'bg-red-900/60 border-retropink-neon text-retropink-neon' : 'bg-black/30 border-retropurple-700 text-retropurple-500'}`}>
            ● REC LIVE
          </div>
          <span className="text-[9px] text-retropurple-400">{segment.timestamp}</span>
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── CENTER: TV ── */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#100e28] p-3 gap-2 overflow-hidden">

          {/* Segment switcher bar */}
          <div className="flex items-center justify-between bg-retropurple-900/70 border border-retropurple-700 px-2 py-1.5 flex-shrink-0">
            <button onClick={prevSegment} className="flex items-center gap-1 px-2 py-0.5 bg-retropurple-700 hover:bg-retropurple-500 bevel-button text-[9px] font-pixel text-white">
              <ChevronLeft className="w-3 h-3" /> PREV TAPE
            </button>
            <div className="text-center">
              <div className="font-pixel text-[9px] text-retropink-pastel">TAPE {segmentIndex + 1} / {BROADCAST_SEGMENTS.length}</div>
              <div className="text-[8px] text-retropurple-300">{segment.speaker}</div>
            </div>
            <button onClick={nextSegment} className="flex items-center gap-1 px-2 py-0.5 bg-retropurple-700 hover:bg-retropurple-500 bevel-button text-[9px] font-pixel text-white">
              NEXT TAPE <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* CRT Screen */}
          <div
            className="relative flex-1 min-h-0 bg-black rounded-xl border-4 border-[#1a1640] flex flex-col overflow-hidden shadow-[inset_0_0_70px_rgba(0,0,0,0.95),0_0_25px_rgba(41,148,167,0.18)]"
            style={{ filter: `brightness(${brightness}%)` }}
          >
            {/* Scanlines */}
            <div className="absolute inset-0 crt-lines opacity-50 pointer-events-none z-20" />

            {/* Glitch overlay */}
            {staticGlitch && (
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute inset-0 bg-white/12 mix-blend-difference" />
                <div className="absolute top-1/3 left-0 right-0 h-5 bg-retroblue-cyan/20 mix-blend-screen" />
                <div className="absolute top-2/3 left-0 right-0 h-3 bg-retropink-neon/20 mix-blend-screen" />
              </div>
            )}
            {/* VHS horizontal noise */}
            {vhsNoise && (
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute w-full h-2 bg-white/10 top-1/2 mix-blend-overlay" />
              </div>
            )}

            {/* Top screen vignette */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

            {/* HUD row */}
            <div className="relative z-20 flex justify-between items-center px-3 pt-2 text-[9px] font-pixel">
              <span className={`text-white px-1.5 py-0.5 ${segment.isSecurityCam ? 'bg-orange-900/80 text-orange-400 border border-orange-700' : 'bg-red-700/80'}`}>
                {segment.isSecurityCam ? '\u26A0 RECOVERED FOOTAGE' : '\u25CF LIVE NUX-7'}
              </span>
              <span className="text-retrogreen-neon opacity-75">{segment.timestamp}</span>
            </div>

            {/* Main visual */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 gap-3">
              {segment.isSecurityCam ? (
                <div className="w-full max-w-xs border border-orange-700/60 bg-black/70 p-3 flex flex-col items-center gap-2">
                  <div className="text-[9px] font-pixel text-orange-400 tracking-widest">CCTV \u2022 CAM-C7 \u2022 92ND AVE ARCADE</div>
                  <div className="w-full h-28 bg-[#080808] border border-orange-700/40 relative overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,165,0,0.15) 4px)' }}
                    />
                    <div className="relative flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 bg-slate-700 border border-slate-500 flex items-center justify-center text-[8px] text-orange-300 font-pixel">??</div>
                      <div className="text-[8px] text-orange-400 font-pixel">UNIDENTIFIED FIGURE</div>
                    </div>
                    <div className="absolute inset-0 bg-green-900/15 mix-blend-color pointer-events-none" />
                  </div>
                  <div className="text-[8px] text-retropurple-300 font-mono">REC \u2022 {segment.timestamp}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-28 h-24 bg-[#1a1a3a] border-2 border-white/30 flex flex-col items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.08)]">
                      {/* Head */}
                      <div className="w-12 h-11 bg-slate-400 border border-black/60 relative flex flex-col items-center justify-center">
                        <div className="flex gap-3 mb-1">
                          <div className="w-2 h-1.5 bg-black" />
                          <div className="w-2 h-1.5 bg-black" />
                        </div>
                        {/* Expressionless flat mouth */}
                        <div className="w-6 h-0.5 bg-[#333]" />
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/40" />
                      </div>
                      {/* Suit */}
                      <div className="w-16 h-8 bg-slate-800 border-t border-white/20 flex justify-center items-start pt-0.5">
                        <div className="w-2.5 h-5 bg-red-700" />
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-retropurple-900/90 text-white font-pixel text-[7px] px-2 py-0.5 border border-retropurple-400 whitespace-nowrap">
                      {segment.speaker}
                    </div>
                  </div>
                  <div className="text-[9px] text-retroyellow-cream font-mono mt-2 opacity-80">{segment.role}</div>
                </div>
              )}
            </div>

            {/* Subtitle bar */}
            <div className="relative z-20 bg-black/90 border-t border-retropurple-600 px-3 py-2 min-h-[52px] flex items-center justify-center text-center">
              <p className="text-[11px] text-white font-mono leading-relaxed animate-fadeIn">
                {segment.lines[lineIndex]}
              </p>
            </div>

            {/* News ticker */}
            <div className="relative z-20 bg-red-900/85 border-t border-red-700 overflow-hidden flex-shrink-0" style={{ height: '18px' }}>
              <div
                className="absolute top-0 whitespace-nowrap text-[8px] font-pixel text-white leading-none flex items-center h-full"
                style={{ transform: `translateX(${700 - tickerOffset}px)` }}
              >
                {TICKER_TEXT}
              </div>
            </div>
          </div>

          {/* Line progress dots */}
          <div className="flex items-center justify-center gap-2 flex-shrink-0 py-0.5">
            {segment.lines.map((_, i) => (
              <button
                key={i}
                onClick={() => setLineIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === lineIndex ? 'bg-retroblue-cyan scale-125 shadow-[0_0_4px_#00FFFF]' : 'bg-retropurple-600 hover:bg-retropurple-400'}`}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: CONTROL PANEL ── */}
        <div className="w-36 flex-shrink-0 bg-retropurple-900 border-l border-retropurple-600 flex flex-col p-2 gap-2.5 overflow-y-auto">

          {/* Channel display */}
          <div className="bg-black border border-retropurple-700 p-2 text-center flex-shrink-0">
            <div className="font-pixel text-[8px] text-retropink-pastel">CHANNEL</div>
            <div className="font-pixel text-2xl text-retroblue-cyan leading-none">07</div>
            <div className="font-pixel text-[8px] text-retrogreen-neon">NUX-TV</div>
          </div>

          {/* VHS status */}
          <div className="bg-black/60 border border-retropurple-700 px-1.5 py-1 space-y-0.5 flex-shrink-0">
            <div className="text-[7px] font-pixel text-retropurple-400">VHS STATUS</div>
            <div className="text-[8px] font-mono text-retrogreen-neon">{isPlaying ? '\u25B6 PLAYING' : '\u23F8 PAUSED'}</div>
            <div className="text-[7px] font-mono text-retropurple-400">TAPE {segmentIndex + 1}/{BROADCAST_SEGMENTS.length}</div>
          </div>

          {/* Playback controls */}
          <div className="space-y-1 flex-shrink-0">
            <div className="text-[7px] font-pixel text-retropurple-400">PLAYBACK</div>
            <button onClick={prevSegment} className="w-full py-1 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel text-white">
              <Rewind className="w-3 h-3" /> REW
            </button>
            <button onClick={togglePlayback} className="w-full py-1.5 bg-retroblue-teal hover:bg-retroblue-cyan hover:text-black bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel text-white transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <button onClick={nextSegment} className="w-full py-1 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel text-white">
              <FastForward className="w-3 h-3" /> FF
            </button>
            <button onClick={triggerGlitch} className="w-full py-1 bg-retropink-rose/80 hover:bg-retropink-neon hover:text-black bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel text-white transition-colors">
              <Radio className="w-3 h-3" /> GLITCH
            </button>
          </div>

          {/* Brightness */}
          <div className="space-y-1 flex-shrink-0">
            <div className="text-[7px] font-pixel text-retropurple-400">BRIGHTNESS</div>
            <input
              type="range" min={40} max={130} value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 accent-retroblue-cyan cursor-pointer"
            />
            <div className="text-[8px] text-center text-retrogreen-neon font-mono">{brightness}%</div>
          </div>

          {/* Mute */}
          <button
            onClick={() => { soundFX.playClick(); setMuted((p) => !p); }}
            className="w-full py-1 bg-retropurple-700 hover:bg-retropurple-500 bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel text-white flex-shrink-0"
          >
            {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            {muted ? 'UNMUTE' : 'MUTE'}
          </button>

          {/* Forensics toggle */}
          <button
            onClick={() => { soundFX.playClick(); setShowForensics((p) => !p); }}
            className={`w-full py-1 bevel-button flex items-center justify-center gap-1 text-[9px] font-pixel transition-colors flex-shrink-0 ${showForensics ? 'bg-retroyellow-warm text-black' : 'bg-retropurple-700 hover:bg-retropurple-500 text-white'}`}
          >
            <Eye className="w-3 h-3" />
            {showForensics ? 'HIDE' : 'FORENSICS'}
          </button>

          {/* Speaker grille */}
          <div className="mt-auto pt-2 space-y-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-retropurple-700" />
            ))}
            <div className="text-[7px] text-retropurple-600 text-center font-mono pt-1">CRT \u2022 199X</div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TAPE NOTE ── */}
      <div className="flex-shrink-0 border-t border-retropurple-700 bg-retropurple-900/80 px-3 py-1.5 text-[9px] text-retropurple-300 flex items-start gap-2">
        <Zap className="w-3 h-3 text-retroyellow-pure flex-shrink-0 mt-0.5" />
        <span><strong className="text-retroyellow-pure">TAPE NOTE:</strong> {segment.note}</span>
      </div>

      {/* ── FORENSIC PSYCHOLOGY PANEL ── */}
      {showForensics && (
        <div className="flex-shrink-0 bg-[#0f0d24] border-t-2 border-retroyellow-warm p-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-retroyellow-pure font-pixel text-[10px] font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            FORENSIC PSYCHOLOGY NOTE \u2014 TAPE {segmentIndex + 1}
          </div>
          <p className="text-retropurple-100 leading-relaxed text-[11px]">
            {segment.agentNote}
          </p>
        </div>
      )}
    </div>
  );
};
