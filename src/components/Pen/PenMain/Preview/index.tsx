import { compileMdx } from "@/MDX/compileMDX"
import { usePenContext } from "../../IndexProvider"
import { useEffect, useState } from "react"
import { VFileMessage } from "vfile-message"
import { ErrorBoundary } from "react-error-boundary"
import IframeContent, { IframeContentProps } from "./IframeContent"

function FallbackComponent({ error }: any) {
  const message = new VFileMessage(error)
  message.fatal = true
  return (
    <pre>
      <code>{String(message)}</code>
    </pre>
  )
}

interface PreviewProps {
  className?: string
}

function Preview({ className }: PreviewProps) {
  const [state, setState] = useState<
    IframeContentProps & { refreshId: number } // refreshId 目的是为了同步执行渲染preview 如果不加 修改mdx pre 不会执行渲染
  >()
  const { globalState } = usePenContext()
  const { initialContent, isMac } = globalState

  useEffect(() => {
    compileMdx({ mdx: initialContent.html, isMac }).then(({ error, html }) => {
      if (error) {
        console.log("🚀 ~ file: index.tsx:26 ~ compileMdx ~ error:", error)
        return
      }
      // 表示初始化
      if (!initialContent._id) {
        setState({
          html,
          css: initialContent.css,
          id: initialContent._id,
          refreshId: state?.refreshId || 1,
        })
      }
    })
  }, [initialContent.html, initialContent.css, initialContent._id, isMac])

  function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <IframeContent {...state} className={className} />
    </ErrorBoundary>
  )
}

export default Preview
