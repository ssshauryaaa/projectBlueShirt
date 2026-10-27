import { useState } from 'react';
import { IcyCaveBackground } from './components/IcyCaveBackground';
import { BlueShirtWindow } from './components/BlueShirtWindow';
import { DesktopIcon } from './components/DesktopIcon';
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { soundFX } from './services/sound';

// App Windows
import { CaseApp } from './components/apps/CaseApp';
import { EvidenceApp } from './components/apps/EvidenceApp';
import { LogsApp } from './components/apps/LogsApp';
import { ReckoningApp } from './components/apps/ReckoningApp';
import { NewsTvApp } from './components/apps/NewsTvApp';
import { TeoNotesApp } from './components/apps/TeoNotesApp';

import type { AppId, WindowState, DesktopIconItem } from './types/desktop';

export default function App() {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [topZIndex, setTopZIndex] = useState<number>(10);

  // Desktop Icons — stateful so positions survive drag
  const ICON_W = 96;
  const ICON_H = 80;
  const ICON_GAP = 8;
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconItem[]>([
    { id: 'case',      title: 'Case File',      filename: 'CASE.EXE',       iconType: 'folder', color: '#FFFF00', position: { col: 0, row: 0 }, x: 16,              y: 16 + 0 * (ICON_H + ICON_GAP) },
    { id: 'evidence', title: 'Evidence Vault',  filename: 'EVIDENCE.EXE',   iconType: 'binary', color: '#FF00AA', position: { col: 0, row: 1 }, x: 16,              y: 16 + 1 * (ICON_H + ICON_GAP) },
    { id: 'logs',     title: 'Incident Logs',   filename: 'LOGS.EXE',        iconType: 'log',    color: '#00FF00', position: { col: 0, row: 2 }, x: 16,              y: 16 + 2 * (ICON_H + ICON_GAP) },
    { id: 'reckoning',title: 'Arcade ROM',      filename: 'RECKONING.EXE',  iconType: 'game',   color: '#00FFFF', position: { col: 0, row: 3 }, x: 16,              y: 16 + 3 * (ICON_H + ICON_GAP) },
    { id: 'news_tv',  title: 'Oct 22 News',     filename: 'NEWS_TV.EXE',    iconType: 'tv',     color: '#FA457E', position: { col: 1, row: 0 }, x: 16 + ICON_W + 8, y: 16 + 0 * (ICON_H + ICON_GAP) },
    { id: 'teo_notes',title: 'Wenoti Notes',    filename: 'TEO_NOTES.TXT',  iconType: 'text',   color: '#C3BCEC', position: { col: 1, row: 1 }, x: 16 + ICON_W + 8, y: 16 + 1 * (ICON_H + ICON_GAP) },
    { id: 'blueshirt',title: 'Machine Cipher',  filename: 'BLUE_SHIRT.SYS', iconType: 'shield', color: '#2994A7', position: { col: 1, row: 2 }, x: 16 + ICON_W + 8, y: 16 + 2 * (ICON_H + ICON_GAP) },
  ]);

  const moveIcon = (id: AppId, x: number, y: number) => {
    setDesktopIcons((prev) => prev.map((ic) => ic.id === id ? { ...ic, x, y } : ic));
  };

  // Windows State Management
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({
    case: {
      id: 'case',
      title: 'CASE.EXE - EXUN INCIDENT 92-WENOTI',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: 120, y: 50 },
      size: { width: 720, height: 500 },
    },
    evidence: {
      id: 'evidence',
      title: 'EVIDENCE.EXE - FORENSIC REPOSITORY',
      icon: '🔍',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      position: { x: 180, y: 70 },
      size: { width: 750, height: 520 },
    },
    logs: {
      id: 'logs',
      title: 'LOGS.EXE - OCT 23 TRANSCRIPT & DILEMMA',
      icon: '📟',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      position: { x: 150, y: 60 },
      size: { width: 700, height: 510 },
    },
    reckoning: {
      id: 'reckoning',
      title: 'THE RECKONING: ORIGINS - ARCADE EMULATOR',
      icon: '🕹️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      position: { x: 160, y: 30 },
      size: { width: 780, height: 610 },
    },
    news_tv: {
      id: 'news_tv',
      title: 'NEWS_TV.EXE - 22-OCT-199X BROADCAST',
      icon: '📺',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      position: { x: 240, y: 80 },
      size: { width: 700, height: 490 },
    },
    teo_notes: {
      id: 'teo_notes',
      title: 'TEO_NOTES.TXT - NOTEPAD',
      icon: '📝',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      position: { x: 280, y: 100 },
      size: { width: 640, height: 460 },
    },
    blueshirt: {
      id: 'blueshirt',
      title: 'BLUE_SHIRT.EXE - MACHINE #92 CIPHER',
      icon: '👕',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      position: { x: 160, y: 50 },
      size: { width: 620, height: 480 },
    },
  });

  const bringToFront = (id: AppId) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
        isMinimized: false,
      },
    }));
  };

  const openApp = (id: AppId) => {
    soundFX.playWindowOpen();
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const closeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (id: AppId) => {
    setWindows((prev) => {
      const willMinimize = !prev[id].isMinimized;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: willMinimize,
        },
      };
    });
  };

  const toggleMaximize = (id: AppId) => {
    soundFX.playClick();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const moveWindow = (id: AppId, x: number, y: number) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: { x, y },
      },
    }));
  };

  const resizeWindow = (id: AppId, w: number, h: number) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size: { width: w, height: h },
      },
    }));
  };

  // Called when START is clicked on the central Blue Shirt window
  const handleStartSite = () => {
    setHasStarted(true);
    // Automatically open CASE.EXE to immediately welcome the investigator
    setTimeout(() => {
      openApp('case');
    }, 400);
  };

  // Called when PLAY MINIGAME is clicked on the central Blue Shirt window
  const handleStartWithMinigame = () => {
    setHasStarted(true);
    setTimeout(() => {
      openApp('reckoning');
    }, 400);
  };

  const handleToggleSound = () => {
    soundFX.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleResetAll = () => {
    soundFX.playBootChime();
    setHasStarted(false);
    setActiveWindowId(null);
    setWindows((prev) => {
      const reset: Record<AppId, WindowState> = { ...prev };
      (Object.keys(reset) as AppId[]).forEach((key) => {
        reset[key] = {
          ...reset[key],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        };
      });
      return reset;
    });
  };

  return (
    <div
      onClick={() => setSelectedIcon(null)}
      className="relative w-screen h-screen overflow-hidden bg-black select-none font-mono"
    >
      {/* 1. Icy Cave Atmosphere Background */}
      <IcyCaveBackground voltageGlitch={hasStarted} />

      {/* 2. CRT Scanlines & Flicker Overlay */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-lines crt-flicker pointer-events-none z-50" />
      )}

      {/* 3. Initial Boot View: BLUE SHIRT Window sits over the icy cave */}
      {!hasStarted ? (
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-4">
          <BlueShirtWindow
            onStart={handleStartSite}
          />
        </div>
      ) : (
        /* 4. The Retro Desktop Environment */
        <div className="relative z-10 w-full h-[calc(100vh-40px)] p-4 sm:p-6 overflow-hidden">
          
          {/* Top Desktop Watermark / Case Header */}
          <div className="absolute top-4 right-6 text-right opacity-35 pointer-events-none select-none hidden sm:block">
            <div className="font-pixel text-[11px] text-retroblue-cyan">
              EXUN NETWORK NODE // WENOTI ARCADE
            </div>
            <div className="font-mono text-xs text-retropurple-100">
              SUBSTATION 14B • 92nd AVENUE • NUXELAND
            </div>
            <div className="font-mono text-[10px] text-retropink-rose">
              “NO CHARACTER ESCAPED FROM THE GAME”
            </div>
          </div>

          {/* Desktop Icons — freely draggable, absolutely positioned */}
          <div className="absolute inset-0" style={{ zIndex: 10 }}>
            {desktopIcons.map((item) => (
              <DesktopIcon
                key={item.id}
                item={item}
                isSelected={selectedIcon === item.id}
                onSelect={() => setSelectedIcon(item.id)}
                onMove={moveIcon}
                onOpen={(id) => {
                  if (id === 'blueshirt') {
                    openApp('blueshirt');
                  } else {
                    openApp(id);
                  }
                }}
              />
            ))}
          </div>

          {/* Windows Layer */}
          {windows.case.isOpen && (
            <WindowFrame
              windowState={windows.case}
              isActive={activeWindowId === 'case'}
              onFocus={() => bringToFront('case')}
              onClose={() => closeApp('case')}
              onMinimize={() => toggleMinimize('case')}
              onToggleMaximize={() => toggleMaximize('case')}
              onMove={(x, y) => moveWindow('case', x, y)}
              onResize={(w, h) => resizeWindow('case', w, h)}
            >
              <CaseApp onOpenReckoning={() => openApp('reckoning')} />
            </WindowFrame>
          )}

          {windows.evidence.isOpen && (
            <WindowFrame
              windowState={windows.evidence}
              isActive={activeWindowId === 'evidence'}
              onFocus={() => bringToFront('evidence')}
              onClose={() => closeApp('evidence')}
              onMinimize={() => toggleMinimize('evidence')}
              onToggleMaximize={() => toggleMaximize('evidence')}
              onMove={(x, y) => moveWindow('evidence', x, y)}
              onResize={(w, h) => resizeWindow('evidence', w, h)}
            >
              <EvidenceApp />
            </WindowFrame>
          )}

          {windows.logs.isOpen && (
            <WindowFrame
              windowState={windows.logs}
              isActive={activeWindowId === 'logs'}
              onFocus={() => bringToFront('logs')}
              onClose={() => closeApp('logs')}
              onMinimize={() => toggleMinimize('logs')}
              onToggleMaximize={() => toggleMaximize('logs')}
              onMove={(x, y) => moveWindow('logs', x, y)}
              onResize={(w, h) => resizeWindow('logs', w, h)}
            >
              <LogsApp />
            </WindowFrame>
          )}

          {windows.reckoning.isOpen && (
            <WindowFrame
              windowState={windows.reckoning}
              isActive={activeWindowId === 'reckoning'}
              onFocus={() => bringToFront('reckoning')}
              onClose={() => closeApp('reckoning')}
              onMinimize={() => toggleMinimize('reckoning')}
              onToggleMaximize={() => toggleMaximize('reckoning')}
              onMove={(x, y) => moveWindow('reckoning', x, y)}
              onResize={(w, h) => resizeWindow('reckoning', w, h)}
            >
              <ReckoningApp />
            </WindowFrame>
          )}

          {windows.news_tv.isOpen && (
            <WindowFrame
              windowState={windows.news_tv}
              isActive={activeWindowId === 'news_tv'}
              onFocus={() => bringToFront('news_tv')}
              onClose={() => closeApp('news_tv')}
              onMinimize={() => toggleMinimize('news_tv')}
              onToggleMaximize={() => toggleMaximize('news_tv')}
              onMove={(x, y) => moveWindow('news_tv', x, y)}
              onResize={(w, h) => resizeWindow('news_tv', w, h)}
            >
              <NewsTvApp />
            </WindowFrame>
          )}

          {windows.teo_notes.isOpen && (
            <WindowFrame
              windowState={windows.teo_notes}
              isActive={activeWindowId === 'teo_notes'}
              onFocus={() => bringToFront('teo_notes')}
              onClose={() => closeApp('teo_notes')}
              onMinimize={() => toggleMinimize('teo_notes')}
              onToggleMaximize={() => toggleMaximize('teo_notes')}
              onMove={(x, y) => moveWindow('teo_notes', x, y)}
              onResize={(w, h) => resizeWindow('teo_notes', w, h)}
            >
              <TeoNotesApp />
            </WindowFrame>
          )}

          {windows.blueshirt.isOpen && (
            <WindowFrame
              windowState={windows.blueshirt}
              isActive={activeWindowId === 'blueshirt'}
              onFocus={() => bringToFront('blueshirt')}
              onClose={() => closeApp('blueshirt')}
              onMinimize={() => toggleMinimize('blueshirt')}
              onToggleMaximize={() => toggleMaximize('blueshirt')}
              onMove={(x, y) => moveWindow('blueshirt', x, y)}
              onResize={(w, h) => resizeWindow('blueshirt', w, h)}
            >
              <div className="p-2">
                <BlueShirtWindow
                  onStart={() => closeApp('blueshirt')}
                  onPlayMinigame={() => {
                    closeApp('blueshirt');
                    openApp('reckoning');
                  }}
                  isDesktop={true}
                />
              </div>
            </WindowFrame>
          )}
        </div>
      )}

      {/* 5. 90s OS Taskbar */}
      {hasStarted && (
        <Taskbar
          windows={Object.values(windows)}
          activeWindowId={activeWindowId}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onFocusApp={bringToFront}
          crtEnabled={crtEnabled}
          onToggleCrt={() => setCrtEnabled(!crtEnabled)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onResetAll={handleResetAll}
        />
      )}
    </div>
  );
}
