import { createMonacoEditor } from "@/monaco"
import { useCallback, useEffect, useRef } from "react"
import { usePenContext } from "../../IndexProvider"

function EditorDesktop() {
  const editorContainerRef = useRef<HTMLDivElement>(null)

  const { globalState, setGlobalState } = usePenContext()
  const { initialContent, activeTab, editorConfig } = globalState

  const editorConfigRef = useRef(editorConfig)

  // 编辑器文本变化 更新代码
  const onChange = useCallback(() => {
    if (editorConfigRef.current) {
      const { models } = editorConfigRef.current
      const { html, css, config } = models
      initialContent.html = html.getModel().getValue()
      initialContent.css = css.getModel().getValue()
      initialContent.config = config.getModel().getValue()

      setGlobalState({ initialContent: { ...initialContent } })
    }
  }, [])

  useEffect(() => {
    if (!editorContainerRef.current) return

    // 初始化编辑器
    const editorConfig = createMonacoEditor({
      container: editorContainerRef.current,
      initialContent,
      onChange,
    })
    setGlobalState({
      editorConfig,
    })
    // 缓存一份
    editorConfigRef.current = editorConfig

    return () => {
      editorConfig.dispose()
    }
  }, [])

  // 监听编辑器是否宽高有变化 动态刷新编辑器位置
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setTimeout(() => {
        editorConfig?.editor?.layout()
      }, 0)
    })

    editorContainerRef.current && observer.observe(editorContainerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [editorConfig])

  useEffect(() => {
    if (!editorConfig) return
    const { models } = editorConfig
    models[activeTab].activate()
  }, [activeTab, editorConfig])

  function onScroll() {}

  return <div className="pt-12 flex-auto h-full" ref={editorContainerRef}></div>
}

export default EditorDesktop
