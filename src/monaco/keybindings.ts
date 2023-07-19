import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

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
