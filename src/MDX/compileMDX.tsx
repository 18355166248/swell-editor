import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { renderToReadableStream } from "react-dom/server"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import remarkFrontmatter from "remark-frontmatter"
import remarkDirective from "remark-directive"
import remarkMath from "remark-math"
import rehypePrism from "rehype-prism-plus"
import rehypeKatex from "rehype-katex" // Render math with KaTeX.
import { evaluate, nodeTypes } from "@mdx-js/mdx"
import { VFile } from "vfile"
import { VFileMessage } from "vfile-message"
import * as runtime from "react/jsx-runtime"
import type { PluggableList } from "unified"
import React, { Fragment, createContext, useContext } from "react"
import { defaultComponents } from "./DefaultComponents"
import rehypeAddLineNumbers from "./customRehypePlugins"
import * as Babebl from "@babel/standalone"
import { validateReactComponents } from "@/utils/validateReactCom"

export const MdxContext = createContext({ isMac: true })
export const useMdxContent = () => useContext(MdxContext)

export interface CompileMdxProps {
  mdx: string
  jsx: string
  isMac: boolean
}

async function compileMdx({ mdx, jsx, isMac }: CompileMdxProps) {
  const file = new VFile({ basename: "example.mdx", value: mdx })
  let html = ""
  let error
  let customComponents = {} // 自定义组件

  let code = Babebl.transform(jsx, { presets: ["react"] }).code
  code = code.replace("export default", "return")

  try {
    customComponents = new Function("React", code)(React)

    if (!validateReactComponents(Object.values(customComponents))) {
      return {
        error: new Error(
          "Not the correct react component (不是正确的 react 组件)"
        ),
      }
    }
  } catch (error) {
    return {
      error,
    }
  }

  const remarkPlugins = [
    remarkGfm,
    remarkFrontmatter,
    remarkMath,
    remarkDirective,
  ]

  const rehypePlugins: PluggableList = [
    rehypeKatex,
    rehypePrism,
    rehypeAddLineNumbers,
    [rehypeRaw, { passThrough: nodeTypes }],
  ]

  try {
    const Content = (
      await evaluate(file, {
        ...runtime,
        useDynamicImport: true,
        remarkPlugins,
        rehypePlugins,
        Fragment,
        useMDXComponents,
      })
    ).default
    // MDN https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream
    const res = renderToReadableStream(
      <MdxContext.Provider value={{ isMac }}>
        <section
          data-tool="编辑器"
          data-website="https://bing.com"
          className="markdown-body"
        >
          <MDXProvider
            components={{ ...defaultComponents, ...customComponents }}
          >
            <Content />
          </MDXProvider>
        </section>
      </MdxContext.Provider>
    )
    await res
      .then((rb) => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  controller.close()
                  return
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value)
                // Check chunks by logging to the console
                push()
              })
            }
            push()
          },
        })
      })
      .then((stream) =>
        // Respond with our stream
        new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text()
      )
      .then((result) => {
        html = result
      })
      .catch((err) => {
        error = err
      })
  } catch (error: any) {
    const message =
      error instanceof VFileMessage ? error : new VFileMessage(error)

    if (!file.messages.includes(message)) {
      file.messages.push(message)
    }

    message.fatal = true
  }

  return { error, html }
}

export { compileMdx }
