import dynamic from "next/dynamic"

const EditorDesktop = dynamic(() => import("./EditorDesktop"), { ssr: false })

function Editor() {
  return <EditorDesktop />
}

export default Editor
