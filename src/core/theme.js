/* jslint browser: true */
/* global document */

export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"

export function setTheme(isDark) {
  document.documentElement.setAttribute("data-bs-theme", isDark ? THEME_DARK : THEME_LIGHT)
}
