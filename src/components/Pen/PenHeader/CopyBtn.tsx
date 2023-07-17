import clsx from "clsx"
import { useState } from "react"

function CopyBtn() {
  const [{ state }, setState] = useState({
    state: "idle",
  })

  function handleClick() {}

  return (
    <>
      <button
        type="button"
        className={clsx(
          "relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3",
          {
            "bg-sky-500/40 text-white dark:bg-gray-800 dark:text-white/40":
              state === "disabled",
            "cursor-auto":
              state === "disabled" || state === "copied" || state === "loading",
            "hover:bg-sky-400":
              state !== "disabled" && state !== "copied" && state !== "loading",
            "bg-sky-500 text-white": state === "idle" || state === "loading",
            "text-sky-500 shadow-copied dark:bg-sky-500/10": state === "copied",
            "shadow-sm": state !== "copied",
            "dark:shadow-none": state === "disabled",
            "dark:shadow-highlight/20":
              state !== "copied" && state !== "disabled",
          }
        )}
        onClick={handleClick}
        disabled={
          state === "copied" || state === "disabled" || state === "loading"
        }
      >
        {state === "copied" ? "复制成功" : "复制"}
      </button>
    </>
  )
}

export default CopyBtn
