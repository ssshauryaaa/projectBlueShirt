import React, { useState, useEffect } from 'react';
import { soundFX } from '../services/sound';
import type { WindowState, AppId } from '../types/desktop';
import { 
  Folder, FileSearch, Terminal, Gamepad2, Tv, FileText, Shirt,
  Volume2, VolumeX, Monitor, Zap, Power
} from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onFocusApp: (id: AppId) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetAll: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onOpenApp,
  onToggleMinimize,
  onFocusApp,
  crtEnabled,
  onToggleCrt,
  soundEnabled,
  onToggleSound,
  onResetAll,
}) => {
  const [startOpen, setStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('01:14:22');
  const [showPowerAlert, setShowPowerAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartToggle = () => {
    soundFX.playClick();
    setStartOpen(!startOpen);
  };

  const handleTaskClick = (w: WindowState) => {
    soundFX.playClick();
    if (w.isMinimized) {
      onToggleMinimize(w.id);
      onFocusApp(w.id);
    } else if (activeWindowId === w.id) {
      onToggleMinimize(w.id);
    } else {
      onFocusApp(w.id);
    }
  };

  return (
    <>
      {/* Start Menu Popup */}
      {startOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-11 left-1 z-50 w-72 bg-retropurple-900 border-2 border-t-retroblue-cyan border-l-retroblue-cyan border-b-retropurple-900 border-r-retropurple-900 shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(41,148,167,0.4)] flex font-mono select-none"
        >
          {/* Left vertical banner */}
          <div className="w-10 bg-gradient-to-t from-retroblue-midnight via-retropurple-700 to-retroblue-teal flex items-end justify-center pb-4 border-r border-retropurple-500">
            <span className="font-pixel text-xs text-retroblue-cyan -rotate-90 tracking-widest whitespace-nowrap drop-shadow-[0_0_6px_#00FFFF]">
              E.E.U.N. OS 92
            </span>
          </div>

          {/* Right Menu Items */}
          <div className="flex-1 p-2 space-y-1 bg-[#141235] text-xs">
            <div className="px-2 py-1 text-[9px] text-retropink-soft font-pixel border-b border-retropurple-700 flex items-center justify-between">
              <span>SYSTEM ARCHIVES</span>
              <span className="text-retrogreen-neon">ONLINE</span>
            </div>

            <button
              onClick={() => {
                onOpenApp('case');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <Folder className="w-4 h-4 text-retroyellow-bright" />
              <span>CASE.EXE (Investigation)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('evidence');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <FileSearch className="w-4 h-4 text-retropink-neon" />
              <span>EVIDENCE.EXE (Forensics)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('logs');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <Terminal className="w-4 h-4 text-retrogreen-neon" />
              <span>LOGS.EXE (Field Transcript)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('reckoning');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <Gamepad2 className="w-4 h-4 text-retroblue-cyan" />
              <span>RECKONING.EXE (Arcade ROM)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('news_tv');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <Tv className="w-4 h-4 text-retropink-rose" />
              <span>NEWS_TV.EXE (Paul Boiler)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('teo_notes');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <FileText className="w-4 h-4 text-retropurple-100" />
              <span>TEO_NOTES.TXT (Manifesto)</span>
            </button>

            <button
              onClick={() => {
                onOpenApp('blueshirt');
                setStartOpen(false);
              }}
              className="w-full px-2.5 py-1.5 hover:bg-retropurple-500 flex items-center gap-2 text-left text-white"
            >
              <Shirt className="w-4 h-4 text-retroblue-cyan" />
              <span>BLUE_SHIRT.EXE (Cipher View)</span>
            </button>

            <div className="border-t border-retropurple-700 my-1 pt-1 space-y-1">
              <button
                onClick={() => {
                  onToggleSound();
                  setStartOpen(false);
                }}
                className="w-full px-2 py-1 hover:bg-retropurple-700 flex items-center justify-between text-retropurple-100 text-[11px]"
              >
                <span>Audio FX</span>
                <span className={soundEnabled ? 'text-retrogreen-neon' : 'text-red-400'}>
                  {soundEnabled ? 'ENABLED' : 'MUTED'}
                </span>
              </button>

              <button
                onClick={() => {
                  onToggleCrt();
                  setStartOpen(false);
                }}
                className="w-full px-2 py-1 hover:bg-retropurple-700 flex items-center justify-between text-retropurple-100 text-[11px]"
              >
                <span>CRT Scanlines</span>
                <span className={crtEnabled ? 'text-retroblue-cyan' : 'text-slate-400'}>
                  {crtEnabled ? 'ACTIVE' : 'OFF'}
                </span>
              </button>

              <button
                onClick={() => {
                  onResetAll();
                  setStartOpen(false);
                }}
                className="w-full px-2 py-1.5 bg-red-950/60 hover:bg-red-800 text-red-200 border border-red-800 flex items-center gap-2 text-left text-[11px] font-pixel"
              >
                <Power className="w-3.5 h-3.5 text-red-400" />
                <span>REBOOT E.E.U.N.</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-retropurple-900 border-t-2 border-retropurple-100 flex items-center justify-between px-1.5 z-40 font-mono select-none shadow-[0_-4px_12px_rgba(0,0,0,0.6)]">
        
        {/* Left: Start Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartToggle}
            className={`px-3 py-1 font-pixel text-xs flex items-center gap-2 bevel-button transition-all ${
              startOpen
                ? 'bg-retroblue-teal text-black font-bold'
                : 'bg-retropurple-500 text-white hover:bg-retropurple-300'
            }`}
          >
            <div className="w-3.5 h-3.5 bg-retroblue-cyan border border-white flex items-center justify-center text-[9px] text-black font-black">
              E
            </div>
            <span>Start</span>
          </button>

          {/* Running Tasks list */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-[45vw] sm:max-w-md">
            {windows
              .filter((w) => w.isOpen)
              .map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleTaskClick(w)}
                  className={`px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 truncate max-w-[140px] bevel-button transition-all ${
                    activeWindowId === w.id && !w.isMinimized
                      ? 'bg-retroblue-midnight text-retroblue-cyan border-retroblue-cyan'
                      : 'bg-retropurple-700 text-retropurple-100 hover:bg-retropurple-500'
                  }`}
                >
                  <span className="text-xs">{w.icon}</span>
                  <span className="truncate text-[11px] font-pixel">{w.title}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-2 text-xs">
          {/* Voltage Fluctuation Warning Meter */}
          <button
            onClick={() => {
              soundFX.playWarble();
              setShowPowerAlert(!showPowerAlert);
            }}
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 bevel-inset bg-black/60 text-retroyellow-pure hover:bg-black font-pixel text-[9px] animate-pulse"
            title="Click to inspect power fluctuation"
          >
            <Zap className="w-3 h-3 text-retroyellow-bright" />
            <span>23-OCT SURGE</span>
          </button>

          {/* CRT Toggle Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onToggleCrt();
            }}
            className={`p-1.5 bevel-button ${crtEnabled ? 'bg-retroblue-teal text-black' : 'bg-retropurple-700 text-retropurple-100'}`}
            title="Toggle CRT Scanline Effect"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          {/* Audio Toggle Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onToggleSound();
            }}
            className={`p-1.5 bevel-button ${soundEnabled ? 'bg-retropurple-500 text-white' : 'bg-retropink-neon text-black'}`}
            title="Toggle Audio Synthesizer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Digital Clock */}
          <div className="bevel-inset bg-black/70 px-2 py-0.5 text-retrogreen-neon font-pixel text-[10px] tracking-wider">
            {currentTime}
          </div>
        </div>
      </div>

      {/* Voltage Surge Popover */}
      {showPowerAlert && (
        <div className="fixed bottom-12 right-2 z-50 w-72 bg-retropurple-900 border-2 border-retroyellow-pure p-3 shadow-2xl font-mono text-xs select-none">
          <div className="flex items-center justify-between border-b border-retroyellow-bright pb-1.5 mb-2">
            <span className="font-pixel text-[10px] text-retroyellow-pure flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> SUBSTATION #14B ANOMALY
            </span>
            <button
              onClick={() => setShowPowerAlert(false)}
              className="text-white hover:text-red-400 font-pixel text-[10px]"
            >
              ×
            </button>
          </div>
          <p className="text-[11px] text-retropurple-100 leading-relaxed">
            Fluctuation recorded on <strong className="text-white">23rd October 01:14 AM</strong>.
            Source: <span className="text-retroblue-cyan">Wenoti Arcade, 92nd Avenue</span>. 
            The electrical grid dropped by 45,000 kW instantaneously as the missing Character entity initialized.
          </p>
        </div>
      )}
    </>
  );
};
