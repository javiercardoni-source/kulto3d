-- =============================================
-- Kulto3D — Initial schema
-- =============================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- Enums
do $$ begin
  create type product_line as enum ('deco', 'branding', 'construction', 'collectibles');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type product_status as enum ('draft', 'active', 'sold_out', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type order_status as enum (
    'pending', 'paid', 'in_production', 'shipped', 'delivered', 'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type payment_method as enum ('mercadopago', 'transfer', 'cash', 'whatsapp');
exception when duplicate_object then null;
end $$;

-- =============================================
-- categories
-- =============================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  line product_line not null,
  description text not null default '',
  icon text,
  color text,
  created_at timestamptz not null default now()
);

create index if not exists idx_categories_line on public.categories(line);

-- =============================================
-- products
-- =============================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  short_description text not null default '',
  line product_line not null,
  category_id uuid references public.categories(id) on delete set null,
  price numeric(10, 2) not null default 0 check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  images text[] not null default '{}',
  featured boolean not null default false,
  status product_status not null default 'draft',
  materials text[] not null default '{}',
  dimensions jsonb,
  lead_time_days integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_line on public.products(line);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_featured on public.products(featured);
create index if not exists idx_products_category on public.products(category_id);

-- =============================================
-- profiles (extends auth.users)
-- =============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- orders
-- =============================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer jsonb not null,
  shipping_address jsonb not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  shipping_cost numeric(10, 2) not null default 0 check (shipping_cost >= 0),
  total numeric(10, 2) not null check (total >= 0),
  payment_method payment_method not null,
  payment_ref text,
  status order_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_orders_created on public.orders(created_at desc);

-- Auto-generate order code: KLT-YYYYMMDD-XXXX
create or replace function public.generate_order_code()
returns trigger
language plpgsql
as $$
declare
  random_suffix text;
begin
  if new.code is null or new.code = '' then
    random_suffix := upper(substring(md5(random()::text) from 1 for 4));
    new.code := 'KLT-' || to_char(now(), 'YYYYMMDD') || '-' || random_suffix;
  end if;
  return new;
end;
$$;

drop trigger if exists set_order_code on public.orders;
create trigger set_order_code
  before insert on public.orders
  for each row execute function public.generate_order_code();

-- =============================================
-- order_items (normalized for analytics)
-- =============================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_slug text,
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_order_items_product on public.order_items(product_id);

-- =============================================
-- updated_at trigger (reusable)
-- =============================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists tr_products_updated_at on public.products;
create trigger tr_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists tr_profiles_updated_at on public.profiles;
create trigger tr_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists tr_orders_updated_at on public.orders;
create trigger tr_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
