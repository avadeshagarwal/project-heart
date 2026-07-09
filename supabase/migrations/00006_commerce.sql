-- =============================================================
-- Migration: 00006_commerce.sql
-- Description: Subscriptions, orders, payments, coupons
-- =============================================================

-- Subscriptions
CREATE TABLE public.subscriptions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  tier              public.subscription_tier NOT NULL DEFAULT 'free',
  provider          public.payment_provider,
  provider_subscription_id TEXT,               -- external subscription ID from Razorpay/Stripe
  
  starts_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at           TIMESTAMPTZ,
  cancelled_at      TIMESTAMPTZ,
  is_active         BOOLEAN DEFAULT true NOT NULL,
  
  metadata          JSONB DEFAULT '{}'::jsonb,
  
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Coupons
CREATE TABLE public.coupons (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code              TEXT NOT NULL UNIQUE,
  description       TEXT,
  
  discount_type     TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value    NUMERIC(10,2) NOT NULL,
  currency          TEXT DEFAULT 'INR',
  
  max_uses          INT,
  current_uses      INT DEFAULT 0 NOT NULL,
  min_order_amount  NUMERIC(10,2) DEFAULT 0,
  
  applicable_tiers  JSONB DEFAULT '[]'::jsonb,   -- which tiers this coupon applies to
  
  starts_at         TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at        TIMESTAMPTZ,
  is_active         BOOLEAN DEFAULT true NOT NULL,
  
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER coupons_updated_at
  BEFORE UPDATE ON public.coupons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Orders
CREATE TABLE public.orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id   UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  coupon_id         UUID REFERENCES public.coupons(id) ON DELETE SET NULL,
  
  status            public.order_status DEFAULT 'pending' NOT NULL,
  amount            NUMERIC(10,2) NOT NULL,
  currency          TEXT DEFAULT 'INR' NOT NULL,
  discount_amount   NUMERIC(10,2) DEFAULT 0,
  tax_amount        NUMERIC(10,2) DEFAULT 0,
  total_amount      NUMERIC(10,2) NOT NULL,
  
  description       TEXT,
  metadata          JSONB DEFAULT '{}'::jsonb,
  
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Payments
CREATE TABLE public.payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  provider            public.payment_provider NOT NULL,
  provider_payment_id TEXT,                     -- Razorpay payment ID / Stripe payment intent
  provider_order_id   TEXT,                     -- Razorpay order ID
  
  amount              NUMERIC(10,2) NOT NULL,
  currency            TEXT DEFAULT 'INR' NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'authorized', 'captured', 'failed', 'refunded')),
  
  payment_method      TEXT,                     -- card, upi, netbanking, wallet
  receipt             TEXT,
  notes               JSONB DEFAULT '{}'::jsonb,
  
  paid_at             TIMESTAMPTZ,
  refunded_at         TIMESTAMPTZ,
  
  created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at          TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
