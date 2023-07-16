/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

const headers = [
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
]

const nextConfig = {
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
