import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { debounce } from "lodash-es"

export const HTML_URI = "file:///index.md"

export function setupMarkdownMode(
  content: string,
  onChange: Function,
  getEditor: Function
) {
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
    getModel: () => model,
    updateDecorations,
    activate: () => {
      console.log(22)
      getEditor().setModel(model)
    },
    dispose() {
      disposables.forEach((disposable) => disposable.dispose())
    },
  }
}
