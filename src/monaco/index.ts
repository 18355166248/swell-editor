import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { getTheme } from "@/utils/theme"
import { monacoConfig } from "./monaco.config"
import { initKeyBindings, updateKeyBinding } from "./keybindings"
import { initMonacoTheme } from "./theme"
import { registerDocumentFormattingEditProviders } from "./formatEdit"
import { ContentProps } from "@/components/Pen/IndexProvider"
import { setupMarkdownMode } from "./markdown"

export interface CreateMonacoEditorProps {
  container: HTMLElement
  initialContent: ContentProps
}

export function createMonacoEditor({
  container,
  initialContent,
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

  registerDocumentFormattingEditProviders()

  const html = setupMarkdownMode(
    initialContent.html,
    (newContent: string) => {
      console.log(newContent)
    },
    () => editor
  )
  disposables.push(html)

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

  // 覆盖 ctrl+s 快捷键 格式化代码
  updateKeyBinding(
    editor,
    "editor.action.formatDocument",
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS
  )

  return {
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}
