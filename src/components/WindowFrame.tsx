import React, { useRef, useState, useEffect } from 'react';
import { soundFX } from '../services/sound';
import type { WindowState } from '../types/desktop';

interface WindowFrameProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (windowState.isMaximized) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: windowState.position.x,
      initialY: windowState.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = Math.max(10, Math.min(window.innerWidth - 120, dragRef.current.initialX + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 80, dragRef.current.initialY + dy));
      onMove(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onMove]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 42,
        width: '100vw',
        height: 'calc(100vh - 42px)',
        zIndex: windowState.zIndex,
      }
    : {
        position: 'fixed',
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        maxWidth: '96vw',
        height: `${windowState.size.height}px`,
        maxHeight: 'calc(100vh - 70px)',
        zIndex: windowState.zIndex,
      };

  return (
    <div
      style={style}
      onClick={onFocus}
      className={`flex flex-col bg-retropurple-900 border-2 font-mono shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-shadow duration-200 select-none ${
        isActive
          ? 'border-t-retroblue-cyan border-l-retroblue-cyan border-b-retropurple-900 border-r-retropurple-900 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
          : 'border-t-retropurple-300 border-l-retropurple-300 border-b-retropurple-900 border-r-retropurple-900 opacity-95'
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onToggleMaximize}
        className={`px-3 py-1.5 flex items-center justify-between cursor-move select-none border-b border-retropurple-700 ${
          isActive
            ? 'bg-gradient-to-r from-retroblue-midnight via-retropurple-500 to-retroblue-teal text-white'
            : 'bg-gradient-to-r from-retropurple-700 to-retropurple-500 text-retropurple-100'
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden pr-2">
          <span className="text-sm">{windowState.icon}</span>
          <span className="font-pixel text-[11px] truncate tracking-wide">
            {windowState.title}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onMinimize();
            }}
            className="w-5 h-5 bg-retropurple-500 bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropurple-300 active:bg-retropurple-700"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onToggleMaximize();
            }}
            className="w-5 h-5 bg-retropurple-500 bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropurple-300 active:bg-retropurple-700"
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          >
            {windowState.isMaximized ? '❐' : '□'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playWindowClose();
              onClose();
            }}
            className="w-5 h-5 bg-retropink-neon bevel-button flex items-center justify-center text-xs font-bold text-white hover:bg-retropink-rose active:bg-retropink-neon"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0f0e26] text-white p-3 sm:p-5 select-text">
        {children}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-retropurple-700 px-3 py-0.5 text-[10px] text-retropurple-100 border-t border-retropurple-500 flex justify-between items-center select-none font-mono">
        <span>STATUS: EXUN SECURE ENCRYPT</span>
        <span className="text-retroblue-cyan">SYS_REV: 22.10</span>
      </div>
    </div>
  );
};
