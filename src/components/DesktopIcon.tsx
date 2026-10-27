import React from 'react';
import { soundFX } from '../services/sound';
import { Folder, FileSearch, Terminal, Gamepad2, Tv, FileText, Shirt } from 'lucide-react';
import type { AppId, DesktopIconItem } from '../types/desktop';

interface DesktopIconProps {
  item: DesktopIconItem;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: (id: AppId) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  item,
  isSelected,
  onSelect,
  onOpen,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playClick();
    onSelect();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group w-24 p-2 flex flex-col items-center text-center cursor-pointer select-none rounded transition-all duration-150 ${
        isSelected
          ? 'bg-retropurple-500/80 border border-dotted border-retroblue-cyan shadow-[0_0_12px_rgba(0,255,255,0.4)]'
          : 'hover:bg-retropurple-700/50'
      }`}
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
