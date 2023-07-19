import { createMonacoEditor } from "@/monaco"
import { useEffect, useRef, useState } from "react"
import { usePenContext } from "../../IndexProvider"

function EditorDesktop() {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)

  const { globalState } = usePenContext()
  const { initialContent } = globalState

  useEffect(() => {
    if (!editorContainerRef.current) return
    // 初始化编辑器
    const editor = createMonacoEditor({
      container: editorContainerRef.current,
      initialContent,
    })

    editorRef.current = editor

    return () => {
      editorRef.current.dispose()
    }
  }, [])

  function onScroll() {}

  function onChange() {}

  return <div className="pt-12 flex-auto h-full" ref={editorContainerRef}></div>
}

export default EditorDesktop
