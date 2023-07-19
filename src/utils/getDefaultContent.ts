// import postcss from 'postcss'
// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'
// import cssnano from 'cssnano'

import { ContentProps } from "@/components/Pen/IndexProvider"
// @ts-ignore
import defaultContent from "raw-loader!./initial.md"

export function getDefaultContent(): ContentProps {
  const html = defaultContent
  const css = `.list-card {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 15px;
  max-width: 320px;
  background: #ffffff;
  border: 1px solid #94cff7;
  opacity: 1;
  border-radius: 6px;
  padding: 5.5px;
}
`
  const config = `function List({ children, title }) {
  return (
    <div className="list-card">
      <div className="list-head">
        <div className="list-head-line"></div>
        <div className="list-head-line"></div>
      </div>
      <div className="list-title">{title}</div>
      <div>{children}</div>
    </div>
  )
}

function Chart({ data = [], color }) {
  return (
    <div className="snowfall">
      {data.map((d, i) => (
        <div
          key={i}
          className="snowfall-bar"
          style={{
            height: d * 20,
            backgroundColor: color,
          }}
        >
          <span>{i + 1}月</span>
        </div>
      ))}
    </div>
  )
}

export default {
  List,
  Chart,
}`

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
    _id: "content",
    html,
    css,
    config,
    // compiledCss,
  }
}
