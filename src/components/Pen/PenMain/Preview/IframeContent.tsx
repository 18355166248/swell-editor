// @ts-ignore
import iframeText from "!!raw-loader!./iframeText.html"
import { themes } from "@/css/markdown-theme"
import { useEffect, useMemo, useRef } from "react"
import { usePenContext } from "../../IndexProvider"
import { baseCss, codeThemes } from "@/css/prism-themes"

export interface IframeContentProps {
  html?: string
  css?: string
  id?: string
}

function IframeContent({ html, css, id }: IframeContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { globalState } = usePenContext()
  const { markdownTheme, codeTheme } = globalState

  const iframeCss = useMemo(() => {
    return baseCss + css + themes[markdownTheme].css + codeThemes[codeTheme].css
  }, [css, markdownTheme, codeTheme])

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { html, css: iframeCss, id },
      "*"
    )
  }, [html, iframeCss])

  return (
    <iframe ref={iframeRef} className="w-full h-full" srcDoc={iframeText} />
  )
}

export default IframeContent
