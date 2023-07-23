import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { getTheme } from "@/utils/theme"
import { monacoConfig } from "./monaco.config"
import { initKeyBindings, updateKeyBinding } from "./keybindings"
import { initMonacoTheme } from "./theme"
import { registerDocumentFormattingEditProviders } from "./formatEdit"
import { ContentProps } from "@/components/Pen/IndexProvider"
import {
  ModelProps,
  setupCssMode,
  setupJavascriptMode,
  setupMarkdownMode,
} from "./modelInit"

export interface CreateMonacoEditorProps {
  container: HTMLElement
  initialContent: ContentProps
  onChange: () => void
}

export function createMonacoEditor({
  container,
  initialContent,
  onChange,
}: CreateMonacoEditorProps) {
  const disposables: any[] = [] // 销毁列表

  window.MonacoEnvironment = {
    getWorkerUrl: (_moduleId, label) => {
      const v = `?v=${
        require("monaco-editor/package.json?fields=version").version
      }`
      if (label === "css" || label === "tailwindcss")
        return `_next/static/chunks/css.worker.js${v}`
      if (label === "html") return `_next/static/chunks/html.worker.js${v}`
      if (label === "typescript" || label === "javascript")
        return `_next/static/chunks/ts.worker.js${v}`
      return `_next/static/chunks/editor.worker.js${v}`
    },
  }

  // 覆盖默认的格式化功能, 使用 prettier 替代
  disposables.push(registerDocumentFormattingEditProviders())

  function onContentChange() {
    onChange()
  }

  // 设置 markdown 的 模型 用来生成预览
  const html = setupMarkdownMode(
    initialContent.html,
    () => {
      onContentChange()
    },
    () => editor
  )
  disposables.push(html)
  // 设置 css 的 模型 用来生成预览
  const css = setupCssMode(
    initialContent.css,
    () => {
      onContentChange()
    },
    () => editor
  )
  disposables.push(css)
  // 设置 js 的 模型 用来生成预览
  const config = setupJavascriptMode(
    initialContent.config,
    () => {
      onContentChange()
    },
    () => editor
  )
  disposables.push(config)

  // 配置主题
  initMonacoTheme()

  // 初始化编辑器
  const editor = monaco.editor.create(container, {
    theme: getTheme() === "dark" ? "dark" : "light",
    wordWrap: "on", // 文本换行配置
    lineHeight: monacoConfig.lineHeight,
    fontSize: monacoConfig.fontSize,
    minimap: {
      enabled: false, // 隐藏
    },
    fixedOverflowWidgets: true, // 我的编辑器整体宽度较小，而提示项的宽度较大，导致提示框的一部分被覆盖。查了一下issues，没有直接把提示框限定在编辑器范围内的配置项。但有一个相关的配置项，设置为true后，可以把隐藏的部分显示出来
    unicodeHighlight: {
      ambiguousCharacters: false, // 取消 unicode ASCII编码 字符串高亮问题
    },
  })

  disposables.push(editor)

  // 初始化快捷键
  initKeyBindings(editor)

  // 设置 ctrl+s 快捷键 = 格式化代码
  updateKeyBinding(
    editor,
    "editor.action.formatDocument",
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS
  )

  // 整合模型
  const models = { html, css, config }

  return {
    editor,
    models,
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}

export type CreateMonacoEditorResult = {
  editor: monaco.editor.IStandaloneCodeEditor
  models: {
    html: ModelProps
    css: ModelProps
    config: ModelProps
  }
  dispose: () => void
}
