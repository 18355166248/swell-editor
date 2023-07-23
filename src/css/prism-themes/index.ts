import rehypeKatexCss from "!!raw-loader!katex/dist/katex.min.css"
import mdxCss from "!!raw-loader!../mdx.css"
import xonokai from "!!raw-loader!prism-themes/themes/prism-xonokai.min.css"
import prismOkaidia from "!!raw-loader!prismjs/themes/prism-okaidia.min.css"
import a11yDark from "!!raw-loader!prism-themes/themes/prism-a11y-dark.min.css"
import atomDark from "!!raw-loader!prism-themes/themes/prism-atom-dark.min.css"
import ghColors from "!!raw-loader!prism-themes/themes/prism-ghcolors.min.css"
import oneDark from "!!raw-loader!prism-themes/themes/prism-one-dark.min.css"
import shadesOfPurple from "!!raw-loader!prism-themes/themes/prism-shades-of-purple.min.css"
import coyShadows from "!!raw-loader!prism-themes/themes/prism-coy-without-shadows.min.css"

export const baseCss = mdxCss + rehypeKatexCss

export const codeThemes = {
  xonokai: {
    name: "xonokai",
    css: xonokai,
  },
  coyShadows: {
    name: "coyShadows",
    css: coyShadows,
  },
  prismOkaidia: {
    name: "prismOkaidia",
    css: prismOkaidia,
  },
  a11yDark: {
    name: "a11yDark",
    css: a11yDark,
  },
  atomDark: {
    name: "atomDark",
    css: atomDark,
  },
  ghColors: {
    name: "ghColors",
    css: ghColors,
  },
  oneDark: {
    name: "oneDark",
    css: oneDark,
  },
  shadesOfPurple: {
    name: "shadesOfPurple",
    css: shadesOfPurple,
  },
}

export type CodeThemesKeysType = keyof typeof codeThemes

export const codeThemesKeys = Object.keys(codeThemes) as CodeThemesKeysType[]
