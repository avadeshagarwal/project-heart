-- =============================================================
-- Migration: 00003_projects.sql
-- Description: Projects, members, templates, and template categories
-- =============================================================

-- Template categories
CREATE TABLE public.template_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          public.template_category_slug NOT NULL UNIQUE,
  description   TEXT,
  icon          TEXT,
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER template_categories_updated_at
  BEFORE UPDATE ON public.template_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Templates
CREATE TABLE public.templates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID REFERENCES public.template_categories(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  preview_url   TEXT,
  thumbnail_url TEXT,
  config        JSONB DEFAULT '{}'::jsonb NOT NULL,       -- full template configuration
  is_premium    BOOLEAN DEFAULT false NOT NULL,
  is_active     BOOLEAN DEFAULT true NOT NULL,
  use_count     INT DEFAULT 0 NOT NULL,
  created_by    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projects (the core entity)
CREATE TABLE public.projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id     UUID REFERENCES public.templates(id) ON DELETE SET NULL,
  
  -- Core fields
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL,
  description     TEXT,
  recipient_name  TEXT,
  occasion        TEXT,
  
  -- Configuration
  status          public.project_status DEFAULT 'draft' NOT NULL,
  visibility      public.project_visibility DEFAULT 'link_only' NOT NULL,
  password_hash   TEXT,                                    -- for password-protected projects
  theme_config    JSONB DEFAULT '{}'::jsonb NOT NULL,       -- colors, fonts, animations
  music_config    JSONB DEFAULT '{}'::jsonb NOT NULL,       -- background music settings
  section_order   JSONB DEFAULT '[]'::jsonb NOT NULL,       -- ordered array of section IDs
  
  -- Metadata
  cover_image_url TEXT,
  custom_domain   TEXT,
  expires_at      TIMESTAMPTZ,                              -- optional project expiry
  published_at    TIMESTAMPTZ,
  
  -- Audit
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at      TIMESTAMPTZ,
  
  -- Unique slug per owner
  UNIQUE(owner_id, slug)
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project Members (collaborators)
CREATE TABLE public.project_members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role          public.project_role DEFAULT 'viewer' NOT NULL,
  invited_by    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  accepted_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  
  UNIQUE(project_id, user_id)
);

CREATE TRIGGER project_members_updated_at
  BEFORE UPDATE ON public.project_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project Sections (modular content blocks)
CREATE TABLE public.project_sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type          public.section_type NOT NULL,
  title         TEXT,
  config        JSONB DEFAULT '{}'::jsonb NOT NULL,       -- section-specific configuration
  display_order INT DEFAULT 0 NOT NULL,
  is_visible    BOOLEAN DEFAULT true NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at    TIMESTAMPTZ
);

CREATE TRIGGER project_sections_updated_at
  BEFORE UPDATE ON public.project_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
