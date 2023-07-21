import { compile } from "@mdx-js/mdx"
import { MDXProvider } from "@mdx-js/react"
import { renderToReadableStream } from "react-dom/server"

async function CompileMdx() {
  const res = await compile("# name")

  const stream = await renderToReadableStream(<MDXProvider></MDXProvider>)
}

export { CompileMdx }
