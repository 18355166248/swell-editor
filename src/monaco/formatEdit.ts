import { createWorkerQueue } from "@/utils/workers"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import PrettierWorker from "worker-loader!../workers/prettier.worker.js"

function registerDocumentFormattingEditProviders () {
  const disposables: any[] = [] // 销毁列表
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
    monaco.languages.registerDocumentFormattingEditProvider;

  // 注册不同余元格式化的方法
  disposables.push(_registerDocumentFormattingEditProvider("markdown", formattingEditProvider))
  disposables.push(_registerDocumentFormattingEditProvider("css", formattingEditProvider))
  disposables.push(_registerDocumentFormattingEditProvider("javascript", formattingEditProvider))

  return {
    dispose () {
      disposables.forEach(disposable => disposable.dispose())
      prettierWorker && prettierWorker.terminate()
    }
  }
}

export { registerDocumentFormattingEditProviders }
