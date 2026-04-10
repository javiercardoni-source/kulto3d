-- =============================================
-- Kulto3D — Row Level Security policies
-- =============================================

-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- =============================================
-- categories: public read
-- =============================================
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  using (true);

-- =============================================
-- products: public read (only active)
-- =============================================
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (status = 'active');

-- admin: full access
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- =============================================
-- profiles: own profile + admin read-all
-- =============================================
drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- =============================================
-- orders: owner + admin
-- =============================================
drop policy if exists "orders_read_own" on public.orders;
create policy "orders_read_own"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- =============================================
-- order_items: owner via parent order + admin
-- =============================================
drop policy if exists "order_items_read_own" on public.order_items;
create policy "order_items_read_own"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all"
  on public.order_items for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- NOTE: all writes to products/categories/orders from the app should
-- go through the service_role client (server-side only), bypassing RLS.
