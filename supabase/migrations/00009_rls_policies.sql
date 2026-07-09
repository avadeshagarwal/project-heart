-- =============================================================
-- Migration: 00009_rls_policies.sql
-- Description: Row Level Security policies for all tables
-- =============================================================

-- =========================================
-- PROFILES
-- =========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles"
  ON public.profiles FOR SELECT
  USING ((preferences ->> 'public_profile')::boolean = true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =========================================
-- USER PREFERENCES
-- =========================================
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON public.user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- =========================================
-- TEMPLATE CATEGORIES (public read)
-- =========================================
ALTER TABLE public.template_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active template categories"
  ON public.template_categories FOR SELECT
  USING (is_active = true);

-- =========================================
-- TEMPLATES (public read, admin write)
-- =========================================
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active templates"
  ON public.templates FOR SELECT
  USING (is_active = true AND deleted_at IS NULL);

-- =========================================
-- PROJECTS
-- =========================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Owners can do everything
CREATE POLICY "Owners can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = owner_id AND deleted_at IS NULL);

CREATE POLICY "Owners can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = owner_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can soft-delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = owner_id);

-- Members can view projects they're invited to
CREATE POLICY "Members can view shared projects"
  ON public.projects FOR SELECT
  USING (
    id IN (
      SELECT project_id FROM public.project_members
      WHERE user_id = auth.uid() AND accepted_at IS NOT NULL
    )
    AND deleted_at IS NULL
  );

-- Public published projects are visible to anyone
CREATE POLICY "Anyone can view public published projects"
  ON public.projects FOR SELECT
  USING (
    status = 'published'
    AND visibility = 'public'
    AND deleted_at IS NULL
  );

-- Link-only published projects are visible to anyone with the link
CREATE POLICY "Anyone can view link-only published projects"
  ON public.projects FOR SELECT
  USING (
    status = 'published'
    AND visibility = 'link_only'
    AND deleted_at IS NULL
  );

-- =========================================
-- PROJECT MEMBERS
-- =========================================
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project owners can manage members"
  ON public.project_members FOR ALL
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Members can view their own membership"
  ON public.project_members FOR SELECT
  USING (user_id = auth.uid());

-- =========================================
-- PROJECT SECTIONS
-- =========================================
ALTER TABLE public.project_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project owners can manage sections"
  ON public.project_sections FOR ALL
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Members with editor role can manage sections"
  ON public.project_sections FOR ALL
  USING (
    project_id IN (
      SELECT project_id FROM public.project_members
      WHERE user_id = auth.uid() AND role IN ('editor', 'owner') AND accepted_at IS NOT NULL
    )
  );

CREATE POLICY "Public projects sections are viewable"
  ON public.project_sections FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM public.projects
      WHERE status = 'published' AND visibility IN ('public', 'link_only') AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
    AND is_visible = true
  );

-- =========================================
-- CONTENT TABLES (same pattern: owner manages, public reads published)
-- =========================================

-- Helper function: check if user owns the project
CREATE OR REPLACE FUNCTION public.is_project_owner(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.projects
    WHERE id = p_project_id AND owner_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: check if project is publicly viewable
CREATE OR REPLACE FUNCTION public.is_project_public(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.projects
    WHERE id = p_project_id AND status = 'published' AND visibility IN ('public', 'link_only') AND deleted_at IS NULL
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Apply identical RLS to all content tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'timeline_events', 'letters', 'photo_gallery', 'videos',
    'music_tracks', 'voice_messages', 'interactive_games', 'countdowns'
  ])
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
    
    EXECUTE format(
      'CREATE POLICY "Owner can manage %1$s" ON public.%1$s FOR ALL USING (public.is_project_owner(project_id))',
      tbl
    );
    
    EXECUTE format(
      'CREATE POLICY "Public can view %1$s" ON public.%1$s FOR SELECT USING (public.is_project_public(project_id) AND deleted_at IS NULL)',
      tbl
    );
  END LOOP;
END;
$$;

-- =========================================
-- PUBLISHED PROJECTS
-- =========================================
ALTER TABLE public.published_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage published versions"
  ON public.published_projects FOR ALL
  USING (public.is_project_owner(project_id));

CREATE POLICY "Public can view published versions"
  ON public.published_projects FOR SELECT
  USING (public.is_project_public(project_id));

-- =========================================
-- QR SHARES
-- =========================================
ALTER TABLE public.qr_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage QR shares"
  ON public.qr_shares FOR ALL
  USING (auth.uid() = created_by);

CREATE POLICY "Active QR shares are public"
  ON public.qr_shares FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- =========================================
-- ANALYTICS EVENTS (insert-only for clients)
-- =========================================
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Owners can view their project analytics"
  ON public.analytics_events FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM public.projects WHERE owner_id = auth.uid()
    )
  );

-- =========================================
-- PROJECT VIEWS
-- =========================================
ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their project view stats"
  ON public.project_views FOR SELECT
  USING (public.is_project_owner(project_id));

CREATE POLICY "System can upsert project views"
  ON public.project_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update project views"
  ON public.project_views FOR UPDATE
  USING (true);

-- =========================================
-- PROJECT VISITORS
-- =========================================
ALTER TABLE public.project_visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their project visitors"
  ON public.project_visitors FOR SELECT
  USING (public.is_project_owner(project_id));

CREATE POLICY "System can upsert visitors"
  ON public.project_visitors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update visitors"
  ON public.project_visitors FOR UPDATE
  USING (true);

-- =========================================
-- PROJECT LIKES
-- =========================================
ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can like public projects"
  ON public.project_likes FOR INSERT
  WITH CHECK (public.is_project_public(project_id));

CREATE POLICY "Owners can view likes"
  ON public.project_likes FOR SELECT
  USING (public.is_project_owner(project_id));

CREATE POLICY "Users can view their own likes"
  ON public.project_likes FOR SELECT
  USING (auth.uid() = user_id);

-- =========================================
-- PROJECT COMMENTS
-- =========================================
ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved comments on public projects"
  ON public.project_comments FOR SELECT
  USING (public.is_project_public(project_id) AND is_approved = true AND deleted_at IS NULL);

CREATE POLICY "Owners can manage all comments on their projects"
  ON public.project_comments FOR ALL
  USING (public.is_project_owner(project_id));

CREATE POLICY "Anyone can add comments to public projects"
  ON public.project_comments FOR INSERT
  WITH CHECK (public.is_project_public(project_id));

-- =========================================
-- NOTIFICATIONS
-- =========================================
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- =========================================
-- SUBSCRIPTIONS
-- =========================================
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- =========================================
-- ORDERS
-- =========================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- =========================================
-- PAYMENTS
-- =========================================
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- =========================================
-- ACTIVITY LOGS
-- =========================================
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity logs"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity logs"
  ON public.activity_logs FOR INSERT
  WITH CHECK (true);

-- =========================================
-- ADMIN SETTINGS (public read for is_public, admin write)
-- =========================================
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read public settings"
  ON public.admin_settings FOR SELECT
  USING (is_public = true);

-- =========================================
-- FEATURE FLAGS (read-only for clients)
-- =========================================
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read feature flags"
  ON public.feature_flags FOR SELECT
  USING (true);

-- =========================================
-- COUPONS (read-only for clients)
-- =========================================
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active coupons are readable"
  ON public.coupons FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- =========================================
-- STORAGE POLICIES
-- =========================================

-- Avatars: public read, owner write
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own avatars"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatars"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Project media (photos, videos, music, voice-notes): owner of file writes, public reads published
CREATE POLICY "Authenticated users can upload project media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('project-photos', 'project-videos', 'music', 'voice-notes', 'generated-images', 'ai-assets')
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can manage their own uploads"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('project-photos', 'project-videos', 'music', 'voice-notes', 'generated-images', 'ai-assets')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own uploads"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('project-photos', 'project-videos', 'music', 'voice-notes', 'generated-images', 'ai-assets')
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Template assets: public read
CREATE POLICY "Anyone can view template assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'template-assets');
