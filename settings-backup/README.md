# Backup av klubb-innstillinger

Her kan du lagre eksporterte farger og stiler (lys + mørk modus) per klubb, slik at du har backup utenfor nettleseren.

## Slik lagrer du innstillinger her

1. **I appen:** Åpne admin (verktøylinjen), velg klubb, klikk **Eksporter**.
2. **Kopier** hele JSON-teksten som vises.
3. **Kjør i terminal** (fra prosjektmappen):
   ```bash
   node scripts/save-settings-backup.js
   ```
   Lim inn JSON-en (Ctrl+V), trykk Enter, deretter **Ctrl+D** (Mac/Linux) eller **Ctrl+Z** og Enter (Windows). Filen lagres som `settings-backup/<klubb-id>-<dato>.json`.

**Alternativ (fra fil):** Lagre den eksporterte JSON i en fil (f.eks. `temp.json`) og kjør:
```bash
node scripts/save-settings-backup.js temp.json
```

Du kan legge disse filene i versjonskontroll (git) for backup på GitHub.
