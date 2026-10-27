import React, { useRef, useState } from 'react';
import { soundFX } from '../services/sound';
import { Folder, FileSearch, Terminal, Gamepad2, Tv, FileText, Shirt } from 'lucide-react';
import type { AppId, DesktopIconItem } from '../types/desktop';

interface DesktopIconProps {
  item: DesktopIconItem;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: (id: AppId) => void;
  onMove: (id: AppId, x: number, y: number) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  item,
  isSelected,
  onSelect,
  onOpen,
  onMove,
}) => {
  const dragRef = useRef<{
    startMouseX: number;
    startMouseY: number;
    startIconX: number;
    startIconY: number;
    dragging: boolean;
  }>({ startMouseX: 0, startMouseY: 0, startIconX: 0, startIconY: 0, dragging: false });

  const [isDragging, setIsDragging] = useState(false);

  const DRAG_THRESHOLD = 5; // px

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // left button only
    e.stopPropagation();
    soundFX.playClick();
    onSelect();

    dragRef.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startIconX: item.x,
      startIconY: item.y,
      dragging: false,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragRef.current.startMouseX;
      const dy = ev.clientY - dragRef.current.startMouseY;

      if (!dragRef.current.dragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        dragRef.current.dragging = true;
        setIsDragging(true);
      }

      if (dragRef.current.dragging) {
        const newX = Math.max(0, dragRef.current.startIconX + dx);
        const newY = Math.max(0, dragRef.current.startIconY + dy);
        onMove(item.id, newX, newY);
      }
    };

    const handleMouseUp = (ev: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (!dragRef.current.dragging) {
        // It was a click, not a drag — do nothing extra (double-click handled separately)
      }

      setIsDragging(false);
      dragRef.current.dragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragRef.current.dragging) return; // ignore if we just dragged
    soundFX.playWindowOpen();
    onOpen(item.id);
  };

  const getIcon = () => {
    switch (item.iconType) {
      case 'folder':
        return <Folder className="w-8 h-8 text-retroyellow-bright fill-retroyellow-cream/30 drop-shadow-[0_2px_8px_rgba(255,255,0,0.4)]" />;
      case 'binary':
        return <FileSearch className="w-8 h-8 text-retropink-neon drop-shadow-[0_2px_8px_rgba(255,0,170,0.5)]" />;
      case 'log':
        return <Terminal className="w-8 h-8 text-retrogreen-neon drop-shadow-[0_2px_8px_rgba(0,255,0,0.5)]" />;
      case 'game':
        return <Gamepad2 className="w-8 h-8 text-retroblue-cyan drop-shadow-[0_2px_8px_rgba(0,255,255,0.5)]" />;
      case 'tv':
        return <Tv className="w-8 h-8 text-retropink-rose drop-shadow-[0_2px_8px_rgba(250,69,126,0.5)]" />;
      case 'text':
        return <FileText className="w-8 h-8 text-retropurple-100 drop-shadow-[0_2px_8px_rgba(195,188,236,0.5)]" />;
      case 'shield':
        return <Shirt className="w-8 h-8 text-retroblue-cyan fill-retroblue-teal/40 drop-shadow-[0_2px_8px_rgba(0,255,255,0.6)]" />;
      default:
        return <Folder className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isSelected ? 20 : 10,
      }}
      className={`group w-24 p-2 flex flex-col items-center text-center select-none rounded transition-colors duration-150 ${
        isSelected
          ? 'bg-retropurple-500/80 border border-dotted border-retroblue-cyan shadow-[0_0_12px_rgba(0,255,255,0.4)]'
          : 'hover:bg-retropurple-700/50'
      } ${isDragging ? 'opacity-80 scale-105' : ''}`}
    >
      <div className="relative mb-1 group-hover:scale-105 transition-transform duration-150">
        {getIcon()}
      </div>
      <span
        className={`font-pixel text-[10px] leading-tight px-1 py-0.5 rounded break-all tracking-wider ${
          isSelected
            ? 'bg-retroblue-cyan text-black font-bold'
            : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,1)]'
        }`}
      >
        {item.filename}
      </span>
    </div>
  );
};
