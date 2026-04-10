# Supabase — Kulto3D

Migraciones SQL para el proyecto Supabase dedicado de Kulto3D.

## Setup inicial

### 1. Crear el proyecto Supabase

1. Entrar a [app.supabase.com](https://app.supabase.com) con la cuenta de Kulto3D.
2. **New project** → Organization: Kitchco (o la que corresponda).
3. Name: `kulto3d`
4. DB password: generar fuerte y guardar en 1Password.
5. Region: `South America (São Paulo)` — más cerca de AR.
6. Pricing: Free tier está bien para empezar.

### 2. Correr las migraciones

**Opción A — SQL Editor (más rápido para empezar)**

1. Ir a **SQL Editor** en el dashboard de Supabase.
2. Crear un nuevo query.
3. Copiar y pegar el contenido de cada archivo, **en orden**:
   - `0001_init.sql` — schema + triggers
   - `0002_rls.sql` — Row Level Security
   - `0003_seed.sql` — categorías base
   - `0004_storage.sql` — bucket de imágenes

4. Ejecutar cada uno (Run).

**Opción B — Supabase CLI**

```bash
# Instalar CLI
brew install supabase/tap/supabase

# Login
supabase login

# Linkear al proyecto
cd /Users/javier/Desktop/Sistema/kulto3d
supabase link --project-ref <PROJECT_REF>

# Aplicar migraciones
supabase db push
```

### 3. Configurar env vars

Copiar los valores del dashboard (**Settings → API**):

```bash
# .env.local en el proyecto
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...    # anon public
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # service_role (SOLO backend)
```

⚠️ **Nunca** commitear `SUPABASE_SERVICE_ROLE_KEY`. Y **nunca** con prefix `NEXT_PUBLIC_`.

### 4. Crear usuarios admin

Después de correr las migraciones, crear las cuentas admin:

1. **Authentication → Users → Add user** en el dashboard.
2. Agregar email de Javi y Facu.
3. Ir al **SQL Editor** y ejecutar:

```sql
update public.profiles
set role = 'admin'
where email in (
  'javiercardoni@gmail.com',
  '<email-de-facu>'
);
```

### 5. Sincronizar envs al VPS

Editar `/opt/kulto3d/.env` en el VPS con los mismos valores y rebuildear el container:

```bash
ssh -i ~/.ssh/id_ed25519 root@147.93.9.138 \
  "cd /opt/kulto3d && docker compose -f docker-compose.prod.yml up -d --build"
```

---

## Verificación

```sql
-- Debería listar las 9 categorías seed
select slug, line, name from public.categories order by line;

-- Debería estar vacío (0 rows)
select count(*) from public.products;

-- Admin check
select email, role from public.profiles;
```

---

## Schema overview

| Tabla | Descripción |
|---|---|
| `categories` | Sub-categorías dentro de cada línea (macetas, lámparas, etc.) |
| `products` | Catálogo de productos |
| `profiles` | Extensión de `auth.users` con rol (customer/admin) |
| `orders` | Pedidos con snapshot de items en jsonb |
| `order_items` | Tabla normalizada para queries/reportes |

### Enums

- `product_line`: `deco` · `branding` · `construction` · `collectibles`
- `product_status`: `draft` · `active` · `sold_out` · `archived`
- `order_status`: `pending` · `paid` · `in_production` · `shipped` · `delivered` · `cancelled`
- `payment_method`: `mercadopago` · `transfer` · `cash` · `whatsapp`

---

## Fallback estático

Mientras no haya Supabase configurado, el proyecto usa los seeds en
`src/data/products.ts` y `src/data/categories.ts` como fallback. El código
de `src/lib/data.ts` detecta automáticamente si hay cliente y elige la
fuente. Esto permite trabajar sin DB en desarrollo.
