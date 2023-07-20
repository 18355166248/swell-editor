import clsx from "clsx"
import { usePenContext } from "../IndexProvider"

function TabBar() {
  const { globalState, setGlobalState } = usePenContext()
  const { activeTab } = globalState
  return (
    <div className="pl-5 pr-4 absolute z-10 left-0 right-0">
      <div className="flex space-x-5">
        <TabButton
          isActive={activeTab === "html"}
          onClick={() => setGlobalState({ activeTab: "html" })}
        >
          MDX
        </TabButton>
        <TabButton
          isActive={activeTab === "css"}
          onClick={() => setGlobalState({ activeTab: "css" })}
        >
          CSS
        </TabButton>
        <TabButton
          isActive={activeTab === "config"}
          onClick={() => setGlobalState({ activeTab: "config" })}
        >
          Config
        </TabButton>
      </div>
    </div>
  )
}

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "relative flex py-3 text-sm leading-6 font-semibold focus:outline-none",
        {
          "text-sky-500": isActive,
          "text-gray-700 hover:text-gray-900 focus:text-gray-900 dark:text-gray-300 dark:hover:text-white":
            !isActive,
        }
      )}
      onClick={onClick}
    >
      <span
        className={clsx(
          "absolute bottom-0 inset-x-0 bg-sky-500 h-0.5 rounded-full transition-opacity duration-150",
          { "opacity-0": !isActive }
        )}
      />
      {children}
    </button>
  )
}

export default TabBar
