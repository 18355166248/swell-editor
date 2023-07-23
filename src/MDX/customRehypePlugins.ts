import { visit } from "unist-util-visit"

// 文档 https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins

// 自定义 rehype plugin
export default function rehypeAddLineNumbers() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.position?.end) {
        node.properties["data-line"] = node.position.end.line
      }
    })
  }
}
