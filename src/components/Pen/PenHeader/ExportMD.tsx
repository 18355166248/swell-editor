import clsx from "clsx"

function ExportMD() {
  function handleExportMD() {}

  return (
    <button
      type="button"
      className={clsx(
        "relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3 bg-sky-500 text-white",
        "hover:bg-sky-400"
      )}
      onClick={handleExportMD}
    >
      导出 MD
    </button>
  )
}

export default ExportMD
