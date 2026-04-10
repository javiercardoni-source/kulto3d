# Kulto3D — Estudio de Diseño + Fabricación 3D

Web: https://kulto3d.com
Repo: https://github.com/javiercardoni-source/kulto3d
Instagram: https://www.instagram.com/kulto3d/

## Qué es

Kulto3D es un **estudio de diseño y fabricación digital** especializado en impresión 3D. Creado por un grupo de amigos que empezó desde cero. No compite por precio — compite por **historia, diseño e identidad**.

> **Leer primero:** [`BRAND.md`](./BRAND.md) — fuente de verdad de la marca (tono, líneas, frases, reglas de copy).

## Socios

- Javier Cardoni ([@javiercardoni](https://github.com/javiercardoni))
- Facu Laion ([@FacuLaion](https://github.com/FacuLaion))

## Las 4 líneas de producto

| Línea | Productos | Tono |
|---|---|---|
| 🌿 **Deco** | Macetas, lámparas, organizadores | Emotivo + estético |
| 🎨 **Branding** | Cartelería 3D, logos en relieve, señalética | Profesional + creativo |
| 🏗️ **Construction** | Rejillas, piezas funcionales | Claro + funcional + confiable |
| 🧠 **Collectibles** | Figuras, fanart, ediciones especiales | Emocional + aspiracional |

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript estricto)
- **Estilos:** Tailwind CSS v4 + shadcn/ui (style `base-nova`, neutral)
- **DB:** Supabase (proyecto dedicado)
- **Pagos:** MercadoPago (Argentina) + transferencia + WhatsApp
- **Deploy:** VPS 147.93.9.138 (Docker + Traefik + Let's Encrypt)
- **Dominio:** kulto3d.com (apex + www)

## Estructura objetivo

```
src/
  app/              # Rutas (App Router)
    productos/      # Catálogo público
    cart/           # Carrito
    checkout/       # Checkout flow
    admin/          # Panel admin (protegido)
    api/            # Route handlers
  components/
    layout/         # Navbar, Footer, Container
    home/           # Hero, LinesGrid, AboutBlock
    catalog/        # ProductCard, ProductGrid, LineFilter
    brand/          # Logo, LineBadge
    ui/             # shadcn/ui
  context/          # CartContext, AuthContext
  lib/
    supabase/       # Clients (browser, server, admin)
    brand.ts        # Constantes de las 4 líneas
    site.ts         # Constantes del sitio
    mappers.ts      # DB → App
    data.ts         # Queries con fallback estático
    shipping.ts     # Cálculo de envío
    mercadopago.ts  # Integración MP
  types/            # TypeScript types
  data/             # Seeds estáticos para dev
supabase/
  migrations/       # SQL migrations
.agents/
  kulto3d-system-prompt.md   # Prompt del agente IA de marca
```

## Convenciones

- TypeScript estricto, `strict: true`
- Tailwind para estilos, sin CSS modules
- shadcn/ui para componentes base
- Server Components por defecto, `"use client"` solo cuando hace falta
- **UI en español, código en inglés**
- Tono de marca SIEMPRE según `BRAND.md`
- Nombres de archivo: `kebab-case` para rutas, `PascalCase` para componentes

## Variables de entorno

Ver [`.env.example`](./.env.example) — copiar a `.env.local` para desarrollo.

Clave: Supabase, MercadoPago, WhatsApp number, Instagram handle.

## Deploy

El container ya corre en el VPS en `/opt/kulto3d/`:

```bash
# Sync
rsync -avz --exclude node_modules --exclude .next --exclude .git \
  . root@147.93.9.138:/opt/kulto3d/

# Rebuild y restart
ssh -i ~/.ssh/id_ed25519 root@147.93.9.138 \
  "cd /opt/kulto3d && docker compose -f docker-compose.prod.yml up -d --build"

# Logs
ssh -i ~/.ssh/id_ed25519 root@147.93.9.138 "docker logs kulto3d-web --tail 50"
```

Traefik enruta `kulto3d.com` + `www.kulto3d.com` → container `kulto3d-web:3000` con SSL automático (Let's Encrypt).

## Agente de contenido Kulto3D

Para generar copy, descripciones, posts o branding siempre cargar primero:
1. [`BRAND.md`](./BRAND.md)
2. [`.agents/kulto3d-system-prompt.md`](./.agents/kulto3d-system-prompt.md)

El agente debe **identificar la línea** (deco/branding/construction/collectibles) antes de escribir y adaptar el tono.
