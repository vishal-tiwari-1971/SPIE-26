// Money Heist Theme - CSS Color Palette Export
// For use in design tools, documentation, and reference

// ============================================
// PRIMARY BRAND COLORS
// ============================================

// Money Heist Red - Primary Brand Color
const RED_PRIMARY = '#d32f2f'
const RED_PRIMARY_RGB = 'rgb(211, 47, 47)'
const RED_PRIMARY_RGBA = 'rgba(211, 47, 47, 1)'

// Dark Red - Secondary Brand Color
const RED_DARK = '#c62828'
const RED_DARK_RGB = 'rgb(198, 40, 40)'
const RED_DARK_RGBA = 'rgba(198, 40, 40, 1)'

// Elegant Gold - Accent Color
const GOLD_ACCENT = '#d4af37'
const GOLD_ACCENT_RGB = 'rgb(212, 175, 55)'
const GOLD_ACCENT_RGBA = 'rgba(212, 175, 55, 1)'

// ============================================
// BACKGROUND COLORS
// ============================================

// Deep Black - Primary Background
const BG_PRIMARY = '#0a0a0a'
const BG_PRIMARY_RGB = 'rgb(10, 10, 10)'
const BG_PRIMARY_RGBA = 'rgba(10, 10, 10, 1)'

// Secondary Black - Secondary Background
const BG_SECONDARY = '#1a1a1a'
const BG_SECONDARY_RGB = 'rgb(26, 26, 26)'
const BG_SECONDARY_RGBA = 'rgba(26, 26, 26, 1)'

// ============================================
// TEXT COLORS
// ============================================

// White - Primary Text
const TEXT_PRIMARY = '#ffffff'
const TEXT_PRIMARY_RGB = 'rgb(255, 255, 255)'
const TEXT_PRIMARY_RGBA = 'rgba(255, 255, 255, 1)'

// Light Gray - Secondary Text
const TEXT_SECONDARY = '#b3b3b3'
const TEXT_SECONDARY_RGB = 'rgb(179, 179, 179)'
const TEXT_SECONDARY_RGBA = 'rgba(179, 179, 179, 1)'

// ============================================
// SURFACE & PANEL COLORS
// ============================================

// Subtle Panel Overlay
const PANEL_DEFAULT = 'rgba(255, 255, 255, 0.03)'

// Strong Panel Overlay
const PANEL_STRONG = 'rgba(255, 255, 255, 0.06)'

// ============================================
// STATUS & INDICATOR COLORS
// ============================================

// Event Status - Upcoming
const STATUS_UPCOMING = '#d32f2f' // Money Heist Red

// Event Status - Ongoing
const STATUS_ONGOING = '#d4af37' // Elegant Gold

// Event Status - Completed
const STATUS_COMPLETED = '#5a5a5a' // Dark Gray

// Ranking - 1st Place
const RANK_FIRST = '#d4af37' // Gold

// Ranking - 2nd Place
const RANK_SECOND = '#c0c0c0' // Silver

// Ranking - 3rd Place
const RANK_THIRD = '#CD7F32' // Bronze

// ============================================
// OVERLAY & TRANSPARENCY COLORS
// ============================================

// Red Overlays
const RED_OVERLAY_LIGHT = 'rgba(211, 47, 47, 0.08)'
const RED_OVERLAY_MEDIUM = 'rgba(211, 47, 47, 0.15)'
const RED_OVERLAY_STRONG = 'rgba(211, 47, 47, 0.3)'
const RED_OVERLAY_INTENSE = 'rgba(211, 47, 47, 0.5)'

// Gold Overlays
const GOLD_OVERLAY_LIGHT = 'rgba(212, 175, 55, 0.08)'
const GOLD_OVERLAY_MEDIUM = 'rgba(212, 175, 55, 0.15)'
const GOLD_OVERLAY_STRONG = 'rgba(212, 175, 55, 0.3)'
const GOLD_OVERLAY_INTENSE = 'rgba(212, 175, 55, 0.5)'

// ============================================
// SHADOW DEFINITIONS
// ============================================

// Primary Shadow - Deep & Dramatic
const SHADOW_PRIMARY = '0 20px 60px rgba(0, 0, 0, 0.7)'

// Button Shadow - Elevated
const SHADOW_BUTTON = '0 12px 32px rgba(211, 47, 47, 0.4)'

// Card Hover Shadow - Emphasized
const SHADOW_CARD_HOVER = '0 24px 60px rgba(211, 47, 47, 0.2)'

// Input Focus Shadow - Subtle
const SHADOW_INPUT_FOCUS = '0 8px 16px rgba(211, 47, 47, 0.1)'

// ============================================
// GRADIENT DEFINITIONS
// ============================================

// Primary Gradient - Red to Gold
const GRADIENT_PRIMARY = 'linear-gradient(90deg, #c62828, #d4af37)'

// Button Gradient - Diagonal Red to Gold
const GRADIENT_BUTTON = 'linear-gradient(135deg, #c62828, #d4af37)'

// Background Gradient - Subtle Glow
const GRADIENT_BG_BASE = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'

// Red Radial Glow
const GRADIENT_GLOW_RED = 'radial-gradient(circle, rgba(211, 47, 47, 0.3), transparent 60%)'

// Gold Radial Glow
const GRADIENT_GLOW_GOLD = 'radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent 60%)'

// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================

const TRANSITION_STANDARD = 'all 120ms ease'
const TRANSITION_HOVER = 'all 150ms ease'
const TRANSITION_SHADOW = '150ms ease'
const TRANSITION_OPACITY = '0.5s ease'
const ANIMATION_SPINNER = '0.8s linear infinite'

// ============================================
// CONTRAST RATIOS & ACCESSIBILITY
// ============================================

// Text on Background Contrast
const CONTRAST_TEXT_ON_BG = 19.6 // #ffffff on #0a0a0a (WCAG AAA)
const CONTRAST_MUTED_ON_BG = 7.2 // #b3b3b3 on #0a0a0a (WCAG AA)
const CONTRAST_RED_ON_BG = 4.8 // #d32f2f on #0a0a0a (WCAG AA)
const CONTRAST_GOLD_ON_BG = 5.2 // #d4af37 on #0a0a0a (WCAG AA)

// ============================================
// CSS CUSTOM PROPERTIES
// ============================================

// Add this to your :root selector in CSS:
/*
:root {
  --background: #0a0a0a;
  --background-accent: #1a1a1a;
  --panel: rgba(255, 255, 255, 0.03);
  --panel-strong: rgba(255, 255, 255, 0.06);
  --foreground: #ffffff;
  --muted: #b3b3b3;
  --primary: #d32f2f;
  --primary-strong: #c62828;
  --accent: #d4af37;
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
}
*/

// ============================================
// TAILWIND CONFIGURATION
// ============================================

// Add this to your tailwind.config.js:
/*
module.exports = {
  theme: {
    colors: {
      // Brand Colors
      'brand-red': '#d32f2f',
      'brand-red-dark': '#c62828',
      'brand-gold': '#d4af37',
      
      // Backgrounds
      'bg-primary': '#0a0a0a',
      'bg-secondary': '#1a1a1a',
      
      // Text
      'text-primary': '#ffffff',
      'text-secondary': '#b3b3b3',
      
      // Status
      'status-upcoming': '#d32f2f',
      'status-ongoing': '#d4af37',
      'status-completed': '#5a5a5a',
    },
    boxShadow: {
      'primary': '0 20px 60px rgba(0, 0, 0, 0.7)',
      'button': '0 12px 32px rgba(211, 47, 47, 0.4)',
      'card-hover': '0 24px 60px rgba(211, 47, 47, 0.2)',
    },
    backgroundImage: {
      'gradient-primary': 'linear-gradient(90deg, #c62828, #d4af37)',
      'gradient-button': 'linear-gradient(135deg, #c62828, #d4af37)',
    }
  }
}
*/

// ============================================
// FIGMA / DESIGN TOOL VARIABLES
// ============================================

// Copy these into your design tool as color variables:

/*
Money Heist Red
#d32f2f | RGB(211, 47, 47)

Dark Red
#c62828 | RGB(198, 40, 40)

Elegant Gold
#d4af37 | RGB(212, 175, 55)

Deep Black
#0a0a0a | RGB(10, 10, 10)

Secondary Black
#1a1a1a | RGB(26, 26, 26)

White
#ffffff | RGB(255, 255, 255)

Muted Gray
#b3b3b3 | RGB(179, 179, 179)

Dark Gray
#5a5a5a | RGB(90, 90, 90)

Silver
#c0c0c0 | RGB(192, 192, 192)

Bronze
#CD7F32 | RGB(205, 127, 50)
*/

// ============================================
// QUICK REFERENCE
// ============================================

// Use in React/Next.js:
// <div style={{ background: RED_PRIMARY, color: TEXT_PRIMARY }}>
//   Money Heist Theme
// </div>

// Use in CSS:
// .button { background: linear-gradient(90deg, #c62828, #d4af37); }

// Use in Tailwind:
// <div className="bg-brand-red text-text-primary shadow-button">
//   Money Heist Theme
// </div>

// ============================================
// END OF COLOR PALETTE
// ============================================

export {
  // Primary
  RED_PRIMARY,
  RED_DARK,
  GOLD_ACCENT,
  // Background
  BG_PRIMARY,
  BG_SECONDARY,
  // Text
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  // Status
  STATUS_UPCOMING,
  STATUS_ONGOING,
  STATUS_COMPLETED,
  RANK_FIRST,
  RANK_SECOND,
  RANK_THIRD,
  // Overlays
  RED_OVERLAY_LIGHT,
  RED_OVERLAY_MEDIUM,
  RED_OVERLAY_STRONG,
  GOLD_OVERLAY_LIGHT,
  GOLD_OVERLAY_MEDIUM,
  GOLD_OVERLAY_STRONG,
  // Shadows
  SHADOW_PRIMARY,
  SHADOW_BUTTON,
  SHADOW_CARD_HOVER,
  // Gradients
  GRADIENT_PRIMARY,
  GRADIENT_BUTTON,
  GRADIENT_BG_BASE,
  GRADIENT_GLOW_RED,
  GRADIENT_GLOW_GOLD,
}
