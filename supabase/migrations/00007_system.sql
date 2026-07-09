-- =============================================================
-- Migration: 00007_system.sql
-- Description: Notifications, activity logs, admin settings, feature flags
-- =============================================================

-- Notifications
CREATE TABLE public.notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  type            public.notification_type NOT NULL,
  title           TEXT NOT NULL,
  body            TEXT,
  data            JSONB DEFAULT '{}'::jsonb,    -- e.g., { project_id, viewer_name }
  
  is_read         BOOLEAN DEFAULT false NOT NULL,
  read_at         TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Activity Logs (audit trail)
CREATE TABLE public.activity_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  action          public.activity_action NOT NULL,
  entity_type     TEXT NOT NULL,                -- e.g., 'project', 'profile', 'template'
  entity_id       UUID,
  
  old_data        JSONB,                        -- previous state (for update/delete)
  new_data        JSONB,                        -- new state (for create/update)
  
  ip_address      INET,
  user_agent      TEXT,
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Admin Settings (key-value store for app-wide config)
CREATE TABLE public.admin_settings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key             TEXT NOT NULL UNIQUE,
  value           JSONB NOT NULL DEFAULT '{}'::jsonb,
  description     TEXT,
  is_public       BOOLEAN DEFAULT false NOT NULL,  -- if true, exposed to the client
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Feature Flags
CREATE TABLE public.feature_flags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key             TEXT NOT NULL UNIQUE,
  description     TEXT,
  
  is_enabled      BOOLEAN DEFAULT false NOT NULL,
  rollout_percentage INT DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  allowed_users   JSONB DEFAULT '[]'::jsonb,    -- array of user IDs for targeted rollout
  
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER feature_flags_updated_at
  BEFORE UPDATE ON public.feature_flags
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
