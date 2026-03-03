# Settings Backup / Backup av klubb-innstillinger

Store exported club settings (colors, styles, light + dark mode) as JSON files outside the browser.

Her kan du lagre eksporterte farger og stiler (lys + mørk modus) per klubb, slik at du har backup utenfor nettleseren.

## How to save / Slik lagrer du

1. **In the app / I appen:** Open admin (DevToolbar), select a club, click **Export / Eksporter**.
2. **Copy** the full JSON text.
3. **Run in terminal / Kjør i terminal** (from the project root / fra prosjektmappen):
   ```bash
   node scripts/save-settings-backup.js
   ```
   Paste the JSON (Ctrl+V), press Enter, then **Ctrl+D** (Mac/Linux) or **Ctrl+Z** + Enter (Windows). The file is saved as `settings-backup/<club-id>-<date>.json`.

**Alternative (from file / fra fil):** Save the exported JSON to a file (e.g. `temp.json`) and run:
```bash
node scripts/save-settings-backup.js temp.json
```

These files can be committed to version control (git) for backup on GitHub.

Du kan legge disse filene i versjonskontroll (git) for backup på GitHub.
