import dlv from "dlv"
import colors from "tailwindcss/colors"

export function toHex(d: number) {
  return Number(d).toString(16).padStart(2, "0")
}

export function getColor(path: string) {
  let [key, opacity = "1"] = path.split("/")
  return (
    dlv(colors, key).replace("#", "") +
    toHex(Math.round(parseFloat(opacity) * 255))
  )
}

export function makeTheme(themeColors: Record<string, string>) {
  return Object.entries(themeColors).map(([token, colorPath]) => ({
    token,
    foreground: getColor(colorPath),
  }))
}
