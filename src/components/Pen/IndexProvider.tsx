import { THEME_KEY } from "@/css/markdown-theme"
import { getDefaultContent } from "@/utils/getDefaultContent"
import { createContext, Dispatch, useContext, useReducer } from "react"
import { CreateMonacoEditorResult } from "../../monaco"
import { CodeThemesKeysType } from "@/css/prism-themes"
import { getTheme } from "@/utils/theme"

export type TabBarKey = "html" | "css" | "config"

export type themeType = "light" | "dark"

export interface ContentProps {
  _id: string
  html: any
  css: string
  config: string
}

/**
 * 定义要储存的类型接口
 */
export interface GlobalFace {
  theme: themeType
  isMac: boolean // 编辑器的代码块是否展示 Mac 风格
  markdownTheme: THEME_KEY // md预览主题
  codeTheme: CodeThemesKeysType // 代码 prism 主题
  initialContent: ContentProps // 初始化数据
  activeTab: TabBarKey // 编辑器的活动选项
  editorConfig?: CreateMonacoEditorResult
  split?: "vertical" | "horizontal" // vertical左右  horizontal上下
  preview: boolean // 只预览 隐藏编辑
  mobile: boolean // 预览 展示手机模式
  startLineNumber: number // mdx 编辑模式 编辑器滚动的开始值
}
/**
 * 初始值
 */
export const globalDataInit: GlobalFace = {
  theme: getTheme() === "dark" ? "dark" : "light",
  isMac: true,
  markdownTheme: "default",
  initialContent: getDefaultContent(),
  activeTab: "html",
  codeTheme: "xonokai", // 代码 prism 主题
  split: "vertical",
  preview: false,
  mobile: false,
  startLineNumber: 0,
}
/**
 * GlobalReducer 接口
 */
export interface GlobalReducerProps {
  globalState: GlobalFace
  setGlobalState: Dispatch<Partial<GlobalFace>>
}

export const GlobalContext = createContext<GlobalReducerProps>({
  globalState: globalDataInit,
  setGlobalState: () => {
    throw new Error("GlobalContext 未定义")
  },
})

export const GlobalReducer = (
  prevState: GlobalFace,
  updatedProperty: Partial<GlobalFace>
): GlobalFace => ({
  ...prevState,
  ...updatedProperty,
})

function IndexProvider({ children }: { children: React.ReactNode }) {
  const [globalState, setGlobalState] = useReducer(
    GlobalReducer,
    globalDataInit
  )

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  )
}

const usePenContext = () => useContext(GlobalContext)

export { IndexProvider, usePenContext }
