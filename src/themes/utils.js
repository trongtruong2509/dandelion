// src/themes/utils.js
export function applyTheme(theme) {
    console.log("[theme]", theme);

    const root = document.documentElement;
    Object.keys(theme).forEach((cssVar) => {
        root.style.setProperty(cssVar, theme[cssVar]);
    });
}

export function createTheme(theme) {

    return {
      "--bg-primary": theme.bgPrimary,
      "--bg-primary-light": theme.bgPrimaryLight,
      "--bg-primary-dark": theme.bgPrimaryDark,
      "--text-primary": theme.textPrimary,
      "--text-secondary": theme.textSecondary,
      "--text-accent": theme.textAccent,
    };
  }