import { THEME_KEY } from "@/css/markdown-theme"
import { getDefaultContent } from "@/utils/getDefaultContent"
import { createContext, Dispatch, useContext, useReducer } from "react"

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
  isMac: boolean
  markdownTheme: THEME_KEY
  initialContent: ContentProps
}
/**
 * 初始值
 */
export const globalDataInit: GlobalFace = {
  isMac: true,
  markdownTheme: "default",
  initialContent: getDefaultContent(),
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
