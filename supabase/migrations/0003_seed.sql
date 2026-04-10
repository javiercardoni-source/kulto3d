-- =============================================
-- Kulto3D — Seed data
-- Categorías base para las 4 líneas
-- =============================================

insert into public.categories (slug, name, line, description, icon) values
  -- 🌿 Deco
  ('macetas', 'Macetas', 'deco', 'Macetas de diseño, autorriego, de pared y sets.', 'sprout'),
  ('lamparas', 'Lámparas', 'deco', 'Luz con diseño propio.', 'lamp'),
  ('organizadores', 'Organizadores', 'deco', 'Para ordenar con estilo.', 'box'),

  -- 🎨 Branding
  ('carteleria', 'Cartelería', 'branding', 'Señalética e identidad física para tu negocio.', 'tag'),
  ('logos-relieve', 'Logos en relieve', 'branding', 'Logos 3D que hablan por tu marca.', 'badge'),

  -- 🏗️ Construction
  ('rejillas', 'Rejillas de ventilación', 'construction', 'Diseño cuidado que respira.', 'grid'),
  ('piezas-funcionales', 'Piezas funcionales', 'construction', 'Componentes a medida para resolver problemas reales.', 'settings'),

  -- 🧠 Collectibles
  ('figuras', 'Figuras', 'collectibles', 'Arte, cultura y personajes en 3D.', 'star'),
  ('ediciones-especiales', 'Ediciones especiales', 'collectibles', 'Piezas únicas, tiradas cortas.', 'gem')

on conflict (slug) do nothing;
