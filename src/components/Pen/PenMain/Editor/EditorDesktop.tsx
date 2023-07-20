import { createMonacoEditor } from "@/monaco"
import { useEffect, useRef } from "react"
import { usePenContext } from "../../IndexProvider"

function EditorDesktop() {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<any>(null)

  const { globalState } = usePenContext()
  const { initialContent, activeTab } = globalState

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

  // 监听编辑器是否宽高有变化 动态刷新编辑器位置
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setTimeout(() => {
        editorRef.current.editor.layout()
      }, 0)
    })

    editorContainerRef.current && observer.observe(editorContainerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const { editor, models } = editorRef.current
    models[activeTab].activate()
  }, [activeTab])

  function onScroll() {}

  function onChange() {}

  return <div className="pt-12 flex-auto h-full" ref={editorContainerRef}></div>
}

export default EditorDesktop
