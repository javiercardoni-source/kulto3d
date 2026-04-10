-- =============================================
-- Kulto3D — Storage buckets
-- =============================================

-- Product images bucket (public read, admin write)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Admin write (insert/update/delete)
drop policy if exists "product_images_admin_write" on storage.objects;
create policy "product_images_admin_write"
  on storage.objects for all
  using (
    bucket_id = 'product-images'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    bucket_id = 'product-images'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
