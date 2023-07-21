/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

const headers = [
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
]

const nextConfig = {
  // 重定向
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/home",
  //       permanent: true,
  //     },
  //   ]
  // },
  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers,
      },
    ]
  },
  webpack: (config, { isServer, webpack, dev }) => {
    if (!isServer) {
      // TODO https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
      // Module not found: Can't resolve 'fs' in Next.js application
      // config.node = {
      //   fs: "empty",
      // }
      config.resolve.fallback = { fs: false }
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["markdown", "css", "typescript", "javascript", "html"],
          filename: "static/chunks/[name].worker.js",
        })
      )
    }
    return config
  },
}

module.exports = nextConfig
