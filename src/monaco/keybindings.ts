import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
// @ts-ignore
import { CommandsRegistry } from "monaco-editor/esm/vs/platform/commands/common/commands"

export function initKeyBindings(editor: monaco.editor.IStandaloneCodeEditor) {
  // 快捷键
  editor.addAction({
    id: "mdx-blod",
    label: "粗体",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
    // A precondition for this action.
    precondition: undefined,
    keybindingContext: undefined,
    contextMenuGroupId: "1_modification",
    contextMenuOrder: 0,
    run: function (ed) {
      const select = ed.getSelection()

      if (select) {
        let text
        select && (text = ed.getModel()?.getValueInRange(select))
        editor.executeEdits("", [{ range: select, text: `**${text}**` }])
      }
    },
  })
}

// 更新快捷键
export const updateKeyBinding = (
  editor: monaco.editor.ICodeEditor,
  id: string,
  newKeyBinding?: number
) => {
  if (editor._standaloneKeybindingService) {
    editor._standaloneKeybindingService.addDynamicKeybinding(
      `-${id}`,
      0,
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
}
