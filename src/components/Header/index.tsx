import CopyBtn from "./CopyBtn"
import ExportPDFBtn from "./ExportPDFBtn"
import ThemeSetting from "./ThemeSetting"

function Header() {
  return (
    <div className="p-3 h-16 flex justify-between items-center border-gray-200 border-solid border-b">
      <div className="left flex items-center space-x-2">
        <h1 className="mr-2">Megalo Editor</h1>
        <CopyBtn />
        <ExportPDFBtn />
      </div>
      <div className="right">{/* <ThemeSetting  /> */}</div>
    </div>
  )
}

export default Header
