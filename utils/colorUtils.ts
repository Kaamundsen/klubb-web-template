// Fargeverktøy for auto-generering av støttefarger
// Bruker HSL-manipulasjon for å lage mørkere/lysere varianter

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/**
 * Konverterer HEX til RGB
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Konverterer RGB til HEX
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Konverterer RGB til HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Konverterer HSL til RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Konverterer HEX til HSL
 */
export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

/**
 * Konverterer HSL til HEX
 */
export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

/**
 * Gjør en farge mørkere
 * @param hex - HEX fargekode
 * @param percent - Hvor mye mørkere (0-100)
 */
export function darken(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  hsl.l = Math.max(0, hsl.l - percent);
  return hslToHex(hsl);
}

/**
 * Gjør en farge lysere
 * @param hex - HEX fargekode
 * @param percent - Hvor mye lysere (0-100)
 */
export function lighten(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  hsl.l = Math.min(100, hsl.l + percent);
  return hslToHex(hsl);
}

/**
 * Øker metning på en farge
 * @param hex - HEX fargekode
 * @param percent - Hvor mye mer mettet (0-100)
 */
export function saturate(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  hsl.s = Math.min(100, hsl.s + percent);
  return hslToHex(hsl);
}

/**
 * Reduserer metning på en farge
 * @param hex - HEX fargekode
 * @param percent - Hvor mye mindre mettet (0-100)
 */
export function desaturate(hex: string, percent: number): string {
  const hsl = hexToHsl(hex);
  hsl.s = Math.max(0, hsl.s - percent);
  return hslToHex(hsl);
}

/**
 * Genererer støttefarger basert på primær- og sekundærfarge
 * @param primary - Primærfarge (HEX)
 * @param secondary - Sekundærfarge (HEX)
 */
export function generateSupportColors(primary: string, secondary: string) {
  return {
    // Mørk bakgrunn: Mørk variant av primærfargen med redusert metning
    primaryDark: darken(desaturate(primary, 20), 35),
    
    // Lys variant av primær for hover-effekter
    primaryLight: lighten(primary, 15),
    
    // Mørk variant av sekundær
    secondaryDark: darken(secondary, 25),
    
    // Lys variant av sekundær for gradienter på knapper
    secondaryLight: lighten(saturate(secondary, 10), 15),
  };
}

/**
 * Genererer en mørk bakgrunnsfarge basert på primærfargen
 * Egnet for dark mode bakgrunner
 */
export function generateDarkBackground(primary: string): string {
  const hsl = hexToHsl(primary);
  // Behold fargetonen, men gjør den veldig mørk og reduser metning
  return hslToHex({
    h: hsl.h,
    s: Math.min(hsl.s, 30), // Maks 30% metning
    l: 8, // Veldig mørk
  });
}

/**
 * Genererer en gradient-farge basert på aksentfargen
 * For bruk i knapper og CTA-elementer
 */
export function generateGradientLight(accent: string): string {
  return lighten(saturate(accent, 10), 12);
}

/**
 * Sjekker om en farge er lys eller mørk
 * Brukes for å bestemme tekstfarge
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  // Beregn luminans
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

/**
 * Returnerer passende tekstfarge (hvit eller sort) for en bakgrunnsfarge
 */
export function getTextColorForBackground(bgHex: string): string {
  return isLightColor(bgHex) ? '#000000' : '#ffffff';
}

/**
 * Genererer 4 balanserte støttefarger basert på primær og sekundær
 * @param primary - Primærfarge (HEX)
 * @param secondary - Sekundærfarge (HEX)
 */
export function generateBalancedSupportColors(primary: string, secondary: string) {
  const primaryHsl = hexToHsl(primary);
  const secondaryHsl = hexToHsl(secondary);
  
  return {
    // Støtte 1: Lysere variant av sekundærfarge (for highlights, gradienter)
    support1: lighten(saturate(secondary, 10), 15),
    
    // Støtte 2: Mørk variant av primærfarge (for mørke bakgrunner, overlays)
    support2: hslToHex({
      h: primaryHsl.h,
      s: Math.min(primaryHsl.s, 35),
      l: 10,
    }),
    
    // Støtte 3: Mørkere blå/navy basert på primærfargens tone (for kontrast)
    support3: hslToHex({
      h: primaryHsl.h,
      s: Math.min(primaryHsl.s + 20, 80),
      l: 18,
    }),
    
    // Støtte 4: Hvit eller veldig lys variant (for tekst, bakgrunner)
    support4: '#ffffff',
  };
}
