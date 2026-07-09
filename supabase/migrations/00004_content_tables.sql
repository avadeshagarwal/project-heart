-- =============================================================
-- Migration: 00004_content_tables.sql
-- Description: All content types within projects
-- =============================================================

-- Timeline Events
CREATE TABLE public.timeline_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  title         TEXT NOT NULL,
  description   TEXT,
  event_date    DATE,
  image_url     TEXT,
  icon          TEXT,
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER timeline_events_updated_at
  BEFORE UPDATE ON public.timeline_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Letters
CREATE TABLE public.letters (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  title         TEXT,
  content       TEXT NOT NULL,                -- rich text / markdown content
  font_family   TEXT DEFAULT 'serif',
  text_color    TEXT DEFAULT '#000000',
  bg_color      TEXT DEFAULT '#ffffff',
  animation     TEXT DEFAULT 'fade-in',
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER letters_updated_at
  BEFORE UPDATE ON public.letters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Photo Gallery
CREATE TABLE public.photo_gallery (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  image_url     TEXT NOT NULL,
  thumbnail_url TEXT,
  caption       TEXT,
  alt_text      TEXT,
  width         INT,
  height        INT,
  file_size     BIGINT,
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER photo_gallery_updated_at
  BEFORE UPDATE ON public.photo_gallery
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Videos
CREATE TABLE public.videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  video_url     TEXT NOT NULL,
  thumbnail_url TEXT,
  title         TEXT,
  description   TEXT,
  duration      INT,                          -- duration in seconds
  file_size     BIGINT,
  mime_type     TEXT,
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Music Tracks
CREATE TABLE public.music_tracks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  audio_url     TEXT NOT NULL,
  title         TEXT,
  artist        TEXT,
  duration      INT,                          -- duration in seconds
  file_size     BIGINT,
  is_background BOOLEAN DEFAULT false NOT NULL,  -- background music for the project
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER music_tracks_updated_at
  BEFORE UPDATE ON public.music_tracks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Voice Messages
CREATE TABLE public.voice_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  audio_url     TEXT NOT NULL,
  title         TEXT,
  transcript    TEXT,                          -- optional speech-to-text
  duration      INT,
  file_size     BIGINT,
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER voice_messages_updated_at
  BEFORE UPDATE ON public.voice_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Interactive Games
CREATE TABLE public.interactive_games (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  game_type     public.game_type NOT NULL,
  title         TEXT,
  config        JSONB DEFAULT '{}'::jsonb NOT NULL,  -- game-specific config (questions, answers, rewards, etc.)
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER interactive_games_updated_at
  BEFORE UPDATE ON public.interactive_games
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Countdowns
CREATE TABLE public.countdowns (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  section_id    UUID REFERENCES public.project_sections(id) ON DELETE SET NULL,
  
  title         TEXT,
  target_date   TIMESTAMPTZ NOT NULL,
  message       TEXT,                          -- message shown when countdown ends
  style_config  JSONB DEFAULT '{}'::jsonb NOT NULL,
  display_order INT DEFAULT 0 NOT NULL,
  
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER countdowns_updated_at
  BEFORE UPDATE ON public.countdowns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
