import { createWorkerQueue } from "@/utils/workers"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import PrettierWorker from "worker-loader!../workers/prettier.worker.js"

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
      if (!prettierWorker) {
        prettierWorker = createWorkerQueue(PrettierWorker)
      }
      // src/workers/prettier.worker.js 内部初始化
      // emit 是在 src/utils/workers.ts 配置
      const { canceled, error, pretty } = (await prettierWorker.emit({
        text: model.getValue(),
        language: model.getLanguageId(),
      })) as any
      if (canceled || error) return []
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
  _registerDocumentFormattingEditProvider("css", formattingEditProvider)
  _registerDocumentFormattingEditProvider("javascript", formattingEditProvider)
}

export { registerDocumentFormattingEditProviders }
