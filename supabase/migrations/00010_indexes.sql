-- =============================================================
-- Migration: 00010_indexes.sql
-- Description: Performance indexes for common query patterns
-- =============================================================

-- =========================================
-- PROFILES
-- =========================================
CREATE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_subscription_tier ON public.profiles(subscription_tier);
CREATE INDEX idx_profiles_deleted_at ON public.profiles(deleted_at) WHERE deleted_at IS NULL;

-- =========================================
-- PROJECTS
-- =========================================
CREATE INDEX idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_visibility ON public.projects(visibility);
CREATE INDEX idx_projects_template_id ON public.projects(template_id) WHERE template_id IS NOT NULL;
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_owner_status ON public.projects(owner_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_published ON public.projects(status, visibility) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX idx_projects_deleted_at ON public.projects(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);

-- =========================================
-- PROJECT MEMBERS
-- =========================================
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);
CREATE INDEX idx_project_members_accepted ON public.project_members(user_id, accepted_at) WHERE accepted_at IS NOT NULL;

-- =========================================
-- PROJECT SECTIONS
-- =========================================
CREATE INDEX idx_project_sections_project_id ON public.project_sections(project_id);
CREATE INDEX idx_project_sections_type ON public.project_sections(project_id, type);
CREATE INDEX idx_project_sections_order ON public.project_sections(project_id, display_order);

-- =========================================
-- CONTENT TABLES (all share project_id + display_order pattern)
-- =========================================
CREATE INDEX idx_timeline_events_project ON public.timeline_events(project_id, display_order);
CREATE INDEX idx_timeline_events_date ON public.timeline_events(project_id, event_date);
CREATE INDEX idx_letters_project ON public.letters(project_id, display_order);
CREATE INDEX idx_photo_gallery_project ON public.photo_gallery(project_id, display_order);
CREATE INDEX idx_videos_project ON public.videos(project_id, display_order);
CREATE INDEX idx_music_tracks_project ON public.music_tracks(project_id, display_order);
CREATE INDEX idx_music_tracks_bg ON public.music_tracks(project_id, is_background) WHERE is_background = true;
CREATE INDEX idx_voice_messages_project ON public.voice_messages(project_id, display_order);
CREATE INDEX idx_interactive_games_project ON public.interactive_games(project_id, display_order);
CREATE INDEX idx_countdowns_project ON public.countdowns(project_id, display_order);

-- =========================================
-- TEMPLATES
-- =========================================
CREATE INDEX idx_templates_category ON public.templates(category_id) WHERE is_active = true;
CREATE INDEX idx_templates_slug ON public.templates(slug);
CREATE INDEX idx_templates_premium ON public.templates(is_premium) WHERE is_active = true;
CREATE INDEX idx_templates_use_count ON public.templates(use_count DESC) WHERE is_active = true;

-- =========================================
-- ANALYTICS (high-volume, critical indexes)
-- =========================================
CREATE INDEX idx_analytics_events_project ON public.analytics_events(project_id, created_at DESC);
CREATE INDEX idx_analytics_events_name ON public.analytics_events(event_name, created_at DESC);
CREATE INDEX idx_analytics_events_session ON public.analytics_events(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_analytics_events_user ON public.analytics_events(user_id) WHERE user_id IS NOT NULL;
-- Partitioning hint: analytics_events should eventually be partitioned by created_at for scale

CREATE INDEX idx_project_views_project_date ON public.project_views(project_id, view_date DESC);
CREATE INDEX idx_project_visitors_project ON public.project_visitors(project_id, last_visit_at DESC);

-- =========================================
-- QR SHARES
-- =========================================
CREATE INDEX idx_qr_shares_short_code ON public.qr_shares(short_code);
CREATE INDEX idx_qr_shares_project ON public.qr_shares(project_id);

-- =========================================
-- COMMERCE
-- =========================================
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_active ON public.subscriptions(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_orders_user ON public.orders(user_id, created_at DESC);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_payments_order ON public.payments(order_id);
CREATE INDEX idx_payments_user ON public.payments(user_id, created_at DESC);
CREATE INDEX idx_payments_provider_id ON public.payments(provider_payment_id) WHERE provider_payment_id IS NOT NULL;
CREATE INDEX idx_coupons_code ON public.coupons(code);

-- =========================================
-- NOTIFICATIONS
-- =========================================
CREATE INDEX idx_notifications_user ON public.notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = false;

-- =========================================
-- ACTIVITY LOGS
-- =========================================
CREATE INDEX idx_activity_logs_user ON public.activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_entity ON public.activity_logs(entity_type, entity_id);

-- =========================================
-- LIKES & COMMENTS
-- =========================================
CREATE INDEX idx_project_likes_project ON public.project_likes(project_id, created_at DESC);
CREATE INDEX idx_project_comments_project ON public.project_comments(project_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_project_comments_parent ON public.project_comments(parent_id) WHERE parent_id IS NOT NULL;

-- =========================================
-- PUBLISHED PROJECTS
-- =========================================
CREATE INDEX idx_published_projects_project ON public.published_projects(project_id, version DESC);

-- =========================================
-- FEATURE FLAGS
-- =========================================
CREATE INDEX idx_feature_flags_key ON public.feature_flags(key);
CREATE INDEX idx_feature_flags_enabled ON public.feature_flags(is_enabled) WHERE is_enabled = true;
