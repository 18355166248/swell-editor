import { createMonacoEditor } from "@/monaco"
import { useEffect, useRef, useState } from "react"

function EditorDesktop() {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)

  const [initialContent] = useState({})

  useEffect(() => {
    if (!editorContainerRef.current) return
    // 初始化编辑器
    const editor = createMonacoEditor({
      container: editorContainerRef.current,
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
