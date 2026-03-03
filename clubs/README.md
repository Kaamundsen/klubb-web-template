# Club Folders / Klubbmapper

Each club has its own folder for images, logos, and other assets.

Hver klubb har sin egen mappe for bilder, logoer og andre ressurser.

## Folder Structure / Mappestruktur

```
/clubs/
  ├── master/           # Klubbnettside.no (default / standard)
  │   ├── logo.svg      # Horizontal logo / Horisontal logo
  │   ├── logo-vertical.svg
  │   ├── hero.jpg      # Default hero image
  │   ├── articles/     # Article images / Artikkelbilder
  │   └── sponsors/     # Sponsor logos / Sponsorlogoer
  │
  ├── msfotball/        # MS Fotball
  │   ├── logo.svg
  │   ├── articles/
  │   └── ...
  │
  ├── dfi/              # DFI
  ├── kolbotn/          # Kolbotn IL
  ├── honefoss/         # Hønefoss BK
  └── ulkisa/           # Ullensaker/Kisa IL
```

## File Naming Conventions / Filnavn-konvensjoner

| File | Purpose (EN) | Bruk (NO) |
|------|-------------|-----------|
| `logo.svg` | Horizontal logo (top nav) | Horisontal logo (toppmeny) |
| `logo-vertical.svg` | Vertical logo (Hero section) | Vertikal logo (Hero-seksjon) |
| `hero.jpg` | Default hero image | Standard hero-bilde |
| `articles/[slug].jpg` | Article images | Artikkelbilder |
| `sponsors/[name].png` | Sponsor logos | Sponsorlogoer |

## Usage in Code / Bruk i koden

Reference club files with / Referer til klubbfiler med:

```tsx
const logoUrl = `/clubs/${club.id}/logo.svg`;
const heroUrl = `/clubs/${club.id}/hero.jpg`;
const articleImg = `/clubs/${club.id}/articles/${slug}.jpg`;
```
