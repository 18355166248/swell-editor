# 编辑器

## 开始

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## monaco editor

覆盖默认的快捷键

https://github.com/Microsoft/monaco-editor/issues/102

```ts
import { editor } from "monaco-editor"
import { CommandsRegistry } from "monaco-editor/esm/vs/platform/commands/common/commands"

export const updateKeyBinding = (
  editor: editor.ICodeEditor,
  id: string,
  newKeyBinding?: number
) => {
  editor._standaloneKeybindingService.addDynamicKeybinding(
    `-${id}`,
    undefined,
    () => {}
  )

  if (newKeyBinding) {
    const { handler, when } = CommandsRegistry.getCommand(id) ?? {}
    if (handler) {
      editor._standaloneKeybindingService.addDynamicKeybinding(
        id,
        newKeyBinding,
        handler,
        when
      )
    }
  }
}

import { IDisposable, editor as editorBase, IEditorAction } from "monaco-editor"

declare module "monaco-editor" {
  export namespace editor {
    export interface StandaloneKeybindingService {
      // from: https://github.com/microsoft/vscode/blob/df6d78a/src/vs/editor/standalone/browser/simpleServices.ts#L337
      // Passing undefined with `-` prefixing the commandId, will unset the existing keybinding.
      // eg `addDynamicKeybinding('-fooCommand', undefined, () => {})`
      // this is technically not defined in the source types, but still works. We can't pass `0`
      // because then the underlying method exits early.
      // See: https://github.com/microsoft/vscode/blob/df6d78a/src/vs/base/common/keyCodes.ts#L414
      addDynamicKeybinding(
        commandId: string,
        keybinding: number | undefined,
        handler: editorBase.ICommandHandler,
        when?: ContextKeyExpression
      ): IDisposable
    }

    export interface ICodeEditor {
      _standaloneKeybindingService: StandaloneKeybindingService
    }
  }
}
```
