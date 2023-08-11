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
  const [state, setState] = useState<IframeContentProps>()
  const { globalState } = usePenContext()
  const { initialContent } = globalState

  useEffect(() => {
    compileMdx({ mdx: initialContent.html }).then(({ error, html }) => {
      if (error) {
        console.log("🚀 ~ file: index.tsx:26 ~ compileMdx ~ error:", error)
        return
      }
      // 表示初始化
      if (!initialContent._id) {
        setState({ html, css: initialContent.css, id: initialContent._id })
      }

    })
  }, [initialContent.html, initialContent.css, initialContent._id])

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
