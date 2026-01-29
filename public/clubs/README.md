# Klubbmapper

Hver klubb har sin egen mappe for bilder, logoer og andre ressurser.

## Mappestruktur

```
/clubs/
  ├── master/           # Klubbnettside.no (standard)
  │   ├── logo.svg      # Horisontal logo
  │   ├── logo-vertical.svg
  │   ├── articles/     # Artikkelbilder
  │   └── sponsors/     # Sponsorlogoer
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

## Filnavn-konvensjoner

- `logo.svg` - Horisontal logo (for toppmeny)
- `logo-vertical.svg` - Vertikal logo (for Hero-seksjon)
- `hero.jpg` - Standard hero-bilde
- `articles/[slug].jpg` - Artikkelbilder

## Bruk i koden

Referer til klubbfiler med:
```tsx
const logoUrl = `/clubs/${club.id}/logo.svg`;
```
