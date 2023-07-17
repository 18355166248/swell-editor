export function getTheme() {
  return document.querySelector("html")?.classList.contains("dark")
    ? "dark"
    : "light"
}
