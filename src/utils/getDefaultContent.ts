// import postcss from 'postcss'
// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'
// import cssnano from 'cssnano'

import { ContentProps } from "@/components/Pen/IndexProvider"
// @ts-ignore
import defaultMd from "!!raw-loader!../mock/defaultContent/initial.md"
// @ts-ignore
import defaultCss from "!!raw-loader!../mock/defaultContent/initial.css"
// @ts-ignore
import defaultJs from "!!raw-loader!../mock/defaultContent/initial.js"

export function getDefaultContent(): ContentProps {
  const html = defaultMd
  const css = defaultCss
  const config = defaultJs

  // let { css: compiledCss } = await postcss([
  //   tailwindcss({
  //     content: [{ raw: html }],
  //   }),
  //   autoprefixer(),
  //   cssnano(),
  // ]).process(css, {
  //   from: undefined,
  // })

  return {
    _id: "",
    html,
    css,
    config,
    // compiledCss,
  }
}
