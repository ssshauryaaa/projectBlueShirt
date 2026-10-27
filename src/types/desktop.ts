export type AppId = 
  | 'case'
  | 'evidence'
  | 'logs'
  | 'reckoning'
  | 'news_tv'
  | 'teo_notes'
  | 'blueshirt';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DesktopIconItem {
  id: AppId;
  title: string;
  filename: string;
  iconType: 'folder' | 'binary' | 'log' | 'game' | 'tv' | 'text' | 'shield';
  color: string;
  position: { col: number; row: number };
}
