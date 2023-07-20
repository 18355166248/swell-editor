import { THEME_KEY } from "@/css/markdown-theme"
import { getDefaultContent } from "@/utils/getDefaultContent"
import { createContext, Dispatch, useContext, useReducer } from "react"

export type TabBarKey = "html" | "css" | "config"

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
  isMac: boolean // 编辑器的代码块是否展示 Mac 风格
  markdownTheme: THEME_KEY // 代码预览主题
  initialContent: ContentProps // 初始化数据
  activeTab: TabBarKey // 编辑器的活动选项
}
/**
 * 初始值
 */
export const globalDataInit: GlobalFace = {
  isMac: true,
  markdownTheme: "default",
  initialContent: getDefaultContent(),
  activeTab: "html",
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
