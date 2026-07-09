-- =============================================================
-- Migration: 00005_sharing_analytics.sql
-- Description: Publishing, sharing, analytics, social features
-- =============================================================

-- Published Projects (immutable snapshots)
CREATE TABLE public.published_projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  version         INT DEFAULT 1 NOT NULL,
  snapshot        JSONB NOT NULL,             -- full serialized project state at publish time
  published_by    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  published_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  UNIQUE(project_id, version)
);

-- QR Shares
CREATE TABLE public.qr_shares (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_by      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  short_code      TEXT NOT NULL UNIQUE,       -- short URL code (e.g., "abc123")
  qr_image_url    TEXT,
  scan_count      INT DEFAULT 0 NOT NULL,
  is_active       BOOLEAN DEFAULT true NOT NULL,
  expires_at      TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER qr_shares_updated_at
  BEFORE UPDATE ON public.qr_shares
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Analytics Events (append-only, high-volume)
CREATE TABLE public.analytics_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  event_name      TEXT NOT NULL,              -- e.g., 'page_view', 'section_viewed', 'music_played'
  event_data      JSONB DEFAULT '{}'::jsonb,  -- flexible event payload
  session_id      TEXT,
  ip_address      INET,
  user_agent      TEXT,
  referrer        TEXT,
  country         TEXT,
  city            TEXT,
  device_type     TEXT,
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Project Views (aggregated counters for performance)
CREATE TABLE public.project_views (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  
  view_date       DATE NOT NULL,
  view_count      INT DEFAULT 0 NOT NULL,
  unique_visitors INT DEFAULT 0 NOT NULL,
  
  UNIQUE(project_id, view_date)
);

-- Project Visitors (unique visitor tracking)
CREATE TABLE public.project_visitors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  
  visitor_hash    TEXT NOT NULL,               -- hashed fingerprint, no PII stored
  first_visit_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  last_visit_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
  visit_count     INT DEFAULT 1 NOT NULL,
  country         TEXT,
  device_type     TEXT,
  
  UNIQUE(project_id, visitor_hash)
);

-- Project Likes (future-ready)
CREATE TABLE public.project_likes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  visitor_hash    TEXT,                        -- allow anonymous likes
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  UNIQUE(project_id, COALESCE(user_id, '00000000-0000-0000-0000-000000000000'::uuid), COALESCE(visitor_hash, ''))
);

-- Project Comments (future-ready)
CREATE TABLE public.project_comments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id      UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  parent_id       UUID REFERENCES public.project_comments(id) ON DELETE CASCADE,
  
  author_name     TEXT,                        -- for anonymous comments
  content         TEXT NOT NULL,
  is_approved     BOOLEAN DEFAULT true NOT NULL,
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at      TIMESTAMPTZ
);

CREATE TRIGGER project_comments_updated_at
  BEFORE UPDATE ON public.project_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
