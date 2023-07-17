import SvgButton from "@/commonComponents/SvgButton"

interface HeaderProps {
  leftBtn: React.ReactNode
  rightBtn: React.ReactNode
}

function Header({ leftBtn, rightBtn }: HeaderProps) {
  function toggleTheme() {
    const root = document.querySelector("html")
    if (root) {
      root.classList.add("disable-transitions")
      if (root.classList.contains("dark")) {
        root.classList.remove("dark")
        try {
          window.localStorage.setItem("theme", "light")
        } catch (_) {}
      } else {
        root.classList.add("dark")
        try {
          window.localStorage.setItem("theme", "dark")
        } catch (_) {}
      }
      window.setTimeout(() => {
        root.classList.remove("disable-transitions")
      }, 0)
    }
  }

  return (
    <div className="p-3 h-16 flex justify-between items-center flex-grow-0 flex-shrink-0 text-gray-700 dark:text-gray-300">
      <div className="left flex items-center space-x-2">
        <h1 className="mr-2 dark:text-white font-bold">Megalo Editor</h1>
        {leftBtn}
      </div>
      <div className="right flex">
        {rightBtn}
        {/* 公共右侧按钮 */}
        {/* 夜间模式 */}
        <SvgButton
          viewBox="0 0 1024 1024"
          className="ml-2"
          onClick={toggleTheme}
        >
          <path
            d="M512 224c159.058 0 288 128.942 288 288S671.058 800 512 800 224 671.058 224 512s128.942-288 288-288z m0 64c-123.712 0-224 100.288-224 224s100.288 224 224 224 224-100.288 224-224-100.288-224-224-224z m0 576c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32zM263.098 760.902c12.497 12.496 12.497 32.758 0 45.254l-45.254 45.255c-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255l45.255-45.254c12.496-12.497 32.758-12.497 45.254 0z m543.058 0l45.255 45.254c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-45.254-45.255c-12.497-12.496-12.497-32.758 0-45.254 12.496-12.497 32.758-12.497 45.254 0zM128 480c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64z m832 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32h-64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64zM217.844 172.589l45.254 45.255c12.497 12.496 12.497 32.758 0 45.254-12.496 12.497-32.758 12.497-45.254 0l-45.255-45.254c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0z m633.567 0c12.497 12.497 12.497 32.758 0 45.255l-45.255 45.254c-12.496 12.497-32.758 12.497-45.254 0-12.497-12.496-12.497-32.758 0-45.254l45.254-45.255c12.497-12.497 32.758-12.497 45.255 0zM512 32c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32z"
            fill="#000000"
            p-id="17339"
          ></path>
        </SvgButton>
      </div>
    </div>
  )
}

export default Header
