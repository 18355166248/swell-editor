import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { DebouncedFunc, debounce } from "lodash-es"

export const HTML_URI = "file:///index.md"
export const CSS_URI = "file:///index.css"
export const JAVASCRIPT_URI = "file:///index.js"

export interface ModelProps {
  getModel: () => monaco.editor.ITextModel
  updateDecorations: DebouncedFunc<() => Promise<void>>
  activate: () => void
  dispose(): void
}

// 初始化 markdown 模型
export function setupMarkdownMode(
  content: string,
  onChange: Function,
  getEditor: Function
): ModelProps {
  const disposables: any[] = []
  const model = monaco.editor.createModel(
    content || "",
    "markdown",
    monaco.Uri.parse(HTML_URI)
  )
  disposables.push(model)

  const updateDecorations = debounce(async () => {}, 100)

  disposables.push(
    model.onDidChangeContent(() => {
      onChange()
    })
  )

  return {
    // 获取模型
    getModel: () => model,
    updateDecorations,
    // 设置当前模型展示
    activate: () => {
      getEditor().setModel(model)
    },
    // 销毁
    dispose() {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}

// 初始化 css 模型
export function setupCssMode(
  content: string,
  onChange: Function,
  getEditor: Function
): ModelProps {
  const disposables: any[] = []
  const model = monaco.editor.createModel(
    content || "",
    "css",
    monaco.Uri.parse(CSS_URI)
  )
  disposables.push(model)

  const updateDecorations = debounce(async () => {}, 100)

  disposables.push(
    model.onDidChangeContent(() => {
      onChange()
    })
  )

  return {
    // 获取模型
    getModel: () => model,
    updateDecorations,
    // 设置当前模型展示
    activate: () => {
      getEditor().setModel(model)
    },
    // 销毁
    dispose() {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}

// 初始化 JS 模型
export function setupJavascriptMode(
  content: string,
  onChange: Function,
  getEditor: Function
): ModelProps {
  const disposables: any[] = []
  const model = monaco.editor.createModel(
    content || "",
    "javascript",
    monaco.Uri.parse(JAVASCRIPT_URI)
  )
  disposables.push(model)

  const updateDecorations = debounce(async () => {}, 100)

  disposables.push(
    model.onDidChangeContent(() => {
      onChange()
    })
  )

  return {
    // 获取模型
    getModel: () => model,
    updateDecorations,
    // 设置当前模型展示
    activate: () => {
      getEditor().setModel(model)
    },
    // 销毁
    dispose() {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}
