export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"

export function setTheme(isDark: boolean) {
  document.documentElement.setAttribute("data-bs-theme", isDark ? THEME_DARK : THEME_LIGHT)
}
