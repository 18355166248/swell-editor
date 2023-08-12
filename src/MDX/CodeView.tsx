import { useMdxContent } from "./compileMDX"

interface CodeViewProps {
  children: any
}

function CodeView({ children, ...otherProps }: CodeViewProps) {
  const { isMac } = useMdxContent()

  return (
    <pre {...otherProps}>
      {isMac ? (
        <section className="code__tools">
          <span className="red code__circle"></span>
          <span className="yellow code__circle"></span>
          <span className="green code__circle"></span>
        </section>
      ) : null}
      {children}
    </pre>
  )
}

export default CodeView
