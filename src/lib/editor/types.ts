// Types for the Section Management and Editor State

export type SectionType = 
  | "hero" 
  | "letter" 
  | "timeline" 
  | "gallery" 
  | "music" 
  | "video" 
  | "voice_message" 
  | "countdown" 
  | "quote" 
  | "divider" 
  | "buttons" 
  | "puzzle" 
  | "scratch_card" 
  | "balloons" 
  | "cake" 
  | "memory_cards" 
  | "custom";

export interface SectionMetadata {
  id: string; // Unique ID for the section instance
  type: SectionType;
  title: string; // E.g., "Hero Section" or a custom renamed title
  isHidden: boolean;
  isLocked: boolean;
  isFavorite?: boolean;
}

// Flexible data payload for a section (will be strictly typed per section in the future)
export type SectionData = Record<string, any>;

export interface Section {
  meta: SectionMetadata;
  data: SectionData;
}

export type DeviceView = "desktop" | "tablet" | "mobile";

// Zustand Store State
export interface EditorState {
  // Project Info
  projectId: string | null;
  projectName: string;

  // Builder State
  sections: Section[];
  selectedSectionIds: string[];
  deviceView: DeviceView;
  isDragging: boolean;
  
  // Dirty State for Autosave
  isDirty: boolean;

  // Actions
  setProjectId: (id: string, name: string) => void;
  setSections: (sections: Section[]) => void;
  addSection: (section: Section, index?: number) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  removeSection: (id: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  
  // Selection
  selectSection: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  // UI Actions
  setDeviceView: (view: DeviceView) => void;
  setIsDragging: (isDragging: boolean) => void;
  setIsDirty: (isDirty: boolean) => void;
  
  // Reset
  reset: () => void;
}
