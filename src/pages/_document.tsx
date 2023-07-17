import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (!('theme' in localStorage)) {
                    localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : 'light'
                  }
                  if (localStorage.theme === 'dark') {
                    document.querySelector('html').classList.add('dark')
                  }
                } catch (_) {}
              `
                .replace(/\s+/g, "")
                .replace("'inlocal", "' in local"),
            }}
          />
        </Head>
        <body className="w-full min-h-screen flex text-gray-900 bg-white dark:text-white dark:bg-gray-900 ">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
