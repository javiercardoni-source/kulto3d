# Kulto3d — E-commerce de Impresiones 3D

Web: www.kulto3d.com
Repo: github.com/javiercardoni-source/kulto3d

## Qué es

Marketplace/e-commerce para vender productos de impresión 3D: macetas, plantas decorativas, y más.
Modelo tipo MercadoLibre — catálogo de productos con carrito y checkout.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **DB:** Supabase (proyecto OlivosSpeed compartido)
- **Deploy:** VPS 147.93.9.138 (Docker + Traefik)
- **Dominio:** kulto3d.com

## Estructura del proyecto

```
src/
  app/           # Rutas (App Router)
  components/    # Componentes reutilizables
    ui/          # shadcn/ui components
  lib/           # Utils, Supabase client, helpers
```

## Convenciones

- TypeScript estricto
- Tailwind para estilos, sin CSS modules
- shadcn/ui para componentes base
- Server Components por defecto, "use client" solo cuando hace falta
- Español en UI, inglés en código

## Deploy

```bash
rsync -avz --exclude node_modules --exclude .next . root@147.93.9.138:/path/kulto3d/
ssh -i ~/.ssh/id_ed25519 root@147.93.9.138 "cd /path/kulto3d && docker compose -f docker-compose.prod.yml up -d --build"
```
