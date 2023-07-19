import { createWorkerQueue } from "@/utils/workers"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

function registerDocumentFormattingEditProviders() {
  let prettierWorker: {
    worker: Worker
    emit(data: any): Promise<unknown>
    terminate(): void
  }

  const formattingEditProvider = {
    async provideDocumentFormattingEdits(
      model: monaco.editor.ITextModel,
      options: monaco.languages.FormattingOptions,
      _token: monaco.CancellationToken
    ) {
      console.log(111, prettierWorker)
      if (!prettierWorker) {
        prettierWorker = createWorkerQueue(
          "worker-loader!../workers/prettier.worker.js"
        )
      }
      const { canceled, error, pretty } = (await prettierWorker.emit({
        text: model.getValue(),
        language: model.getLanguageId(),
      })) as any
      if (canceled || error) return []
      console.log("pretty", pretty)
      return [
        {
          range: model.getFullModelRange(),
          text: pretty,
        },
      ]
    },
  }

  const _registerDocumentFormattingEditProvider =
    monaco.languages.registerDocumentFormattingEditProvider

  _registerDocumentFormattingEditProvider("markdown", formattingEditProvider)
}

export { registerDocumentFormattingEditProviders }
