-- =============================================================
-- Migration: 00001_enums.sql
-- Description: Create all custom enum types for Project Heart
-- =============================================================

-- Project lifecycle
CREATE TYPE public.project_status AS ENUM (
  'draft',
  'published',
  'archived',
  'deleted'
);

-- Project visibility
CREATE TYPE public.project_visibility AS ENUM (
  'public',
  'private',
  'password_protected',
  'link_only'
);

-- Section types within a project
CREATE TYPE public.section_type AS ENUM (
  'timeline',
  'letter',
  'gallery',
  'video',
  'music',
  'voice_message',
  'game',
  'countdown',
  'custom'
);

-- Template categories
CREATE TYPE public.template_category_slug AS ENUM (
  'birthday',
  'anniversary',
  'wedding',
  'proposal',
  'valentines',
  'friendship',
  'family',
  'graduation',
  'baby',
  'memorial',
  'holiday',
  'other'
);

-- Interactive game types
CREATE TYPE public.game_type AS ENUM (
  'quiz',
  'puzzle',
  'memory',
  'scratch_card',
  'spin_wheel',
  'treasure_hunt',
  'custom'
);

-- Subscription tiers
CREATE TYPE public.subscription_tier AS ENUM (
  'free',
  'starter',
  'premium',
  'enterprise'
);

-- Order status
CREATE TYPE public.order_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded',
  'cancelled'
);

-- Payment providers
CREATE TYPE public.payment_provider AS ENUM (
  'razorpay',
  'stripe',
  'manual'
);

-- Notification types
CREATE TYPE public.notification_type AS ENUM (
  'project_viewed',
  'project_liked',
  'project_commented',
  'project_shared',
  'subscription_renewed',
  'payment_received',
  'system_announcement',
  'account_activity'
);

-- Activity log actions
CREATE TYPE public.activity_action AS ENUM (
  'create',
  'update',
  'delete',
  'publish',
  'unpublish',
  'share',
  'view',
  'login',
  'logout',
  'password_change',
  'profile_update',
  'settings_update'
);

-- Member roles on a project
CREATE TYPE public.project_role AS ENUM (
  'owner',
  'editor',
  'viewer'
);

-- Media types
CREATE TYPE public.media_type AS ENUM (
  'image',
  'video',
  'audio',
  'document'
);
