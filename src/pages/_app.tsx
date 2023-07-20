import "../css/main.css"
import type { AppProps /*, AppContext */ } from "next/app"
import Head from "next/head"

const TITLE = "Megalo Editor"
const DESCRIPTION = "markdown 编辑器"
const FAVICON_VERSION = 3

function v(href: string) {
  return `${href}?v=${FAVICON_VERSION}`
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={v("/favicons/apple-touch-icon.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={v("/favicons/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={v("/favicons/favicon-16x16.png")}
        />
        <link rel="manifest" href={v("/favicons/site.webmanifest")} />
        <link
          rel="mask-icon"
          href={v("/favicons/safari-pinned-tab.svg")}
          color="#38bdf8"
        />
        <link rel="shortcut icon" href={v("/favicons/favicon.ico")} /> */}
        <meta name="apple-mobile-web-app-title" content="Megalo Editor" />
        <meta name="application-name" content="Megalo Editor" />
        <meta name="msapplication-TileColor" content="#38bdf8" />
        <meta
          name="msapplication-config"
          content={v("/favicons/browserconfig.xml")}
        />
        <meta name="theme-color" content="#ffffff" />

        <title>{TITLE}</title>
        <meta content={DESCRIPTION} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="twitter:site" content={TITLE} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
