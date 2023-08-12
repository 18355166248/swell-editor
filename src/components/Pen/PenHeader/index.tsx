import Header from "@/components/Pen/Header"
import CopyBtn from "./CopyBtn"
import ExportPDFBtn from "./ExportPDFBtn"
import ThemeSetting from "./ThemeSetting"
import SvgButton from "@/commonComponents/SvgButton"
import clsx from "clsx"
import { themeType, usePenContext } from "../IndexProvider"

function PenHeader() {
  const { globalState, setGlobalState } = usePenContext()
  const { split, preview, mobile } = globalState

  function setTheme(theme: themeType) {
    setGlobalState({
      theme,
    })
  }

  return (
    <Header
      setTheme={setTheme}
      leftBtn={
        <>
          <CopyBtn />
          <ExportPDFBtn />
        </>
      }
      rightBtn={
        <>
          <ThemeSetting />

          <div className="hidden lg:flex mx-4 w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

          <div className="hidden lg:flex items-center rounded-md ring-1 ring-gray-900/5 shadow-sm dark:ring-0 dark:bg-gray-800 dark:shadow-highlight/4">
            {/* 左右布局 */}
            <button
              onClick={() =>
                setGlobalState({ split: "vertical", preview: false })
              }
              type="button"
              className={clsx(
                "group focus:outline-none focus-visible:ring-2 rounded-md",
                split === "vertical"
                  ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
                  : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
              )}
            >
              <span className="sr-only">Switch to vertical split layout</span>
              <svg
                width="42"
                height="36"
                viewBox="-8 -7 42 36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  split === "vertical"
                    ? "fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400"
                    : "fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400"
                )}
              >
                <path
                  d="M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9"
                  fill="none"
                ></path>
                <path d="M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z"></path>
              </svg>
            </button>
            {/* 上下 */}
            <button
              onClick={() =>
                setGlobalState({ split: "horizontal", preview: false })
              }
              type="button"
              className={clsx(
                "group focus:outline-none focus-visible:ring-2 rounded-md",
                split === "horizontal"
                  ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
                  : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
              )}
            >
              <span className="sr-only">Switch to horizontal split layout</span>
              <svg
                width="42"
                height="36"
                viewBox="-8 -7 42 36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  split === "horizontal"
                    ? "fill-sky-100 stroke-sky-400/70 dark:fill-sky-400/20 dark:stroke-sky-500"
                    : "fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400"
                )}
              >
                <path d="M23 11V3H3v8h20Z" strokeWidth="0"></path>
                <path
                  d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2ZM22 11H4"
                  fill="none"
                ></path>
              </svg>
            </button>
            {/* 预览 */}
            <button
              onClick={() =>
                setGlobalState({
                  preview: true,
                  split: undefined,
                })
              }
              type="button"
              className={clsx(
                "group focus:outline-none focus-visible:ring-2 rounded-md",
                preview
                  ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
                  : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
              )}
            >
              <span className="sr-only">Switch to preview-only layout</span>
              <svg
                width="42"
                height="36"
                viewBox="-8 -7 42 36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  preview
                    ? "fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400"
                    : "fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400"
                )}
              >
                <path
                  d="M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"
                  fill="none"
                ></path>
              </svg>
            </button>
            {/* 手机预览 */}
            <button
              onClick={() => setGlobalState({ mobile: !mobile })}
              type="button"
              className={clsx(
                "hidden md:block group focus:outline-none focus-visible:ring-2 rounded-md",
                mobile
                  ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
                  : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
              )}
            >
              <span className="sr-only">Toggle responsive design mode</span>
              <svg
                width="42"
                height="36"
                viewBox="-8 -7 42 36"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(
                  mobile
                    ? "fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400"
                    : "fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400"
                )}
              >
                <path
                  d="M15 19h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a1 1 0 0 0-1 1"
                  fill="none"
                ></path>
                <path d="M12 17V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2Z"></path>
              </svg>
            </button>
          </div>
          <div
            style={{ display: "none" }}
            className="hidden lg:flex items-center ml-2 rounded-md ring-1 ring-gray-900/5 shadow-sm dark:ring-0 dark:bg-gray-500 dark:shadow-highlight/4"
          >
            {/* 展示左右  iconfont layout-sidebar-left */}
            <SvgButton
              onClick={() => {}}
              viewBox="0 0 1024 1024"
              btnWidth={42}
              width={18}
              height={18}
            >
              <path
                d="M0 0h301.176471v1024H0V0z m421.647059 1024h60.235294v-60.235294H421.647059v60.235294z m435.019294 0h53.549176v-60.235294h-53.549176v60.235294z m-107.098353 0h53.549176v-60.235294h-53.549176v60.235294z m-214.136471 0h53.549177v-60.235294h-53.549177v60.235294z m107.098353 0h53.549177v-60.235294h-53.549177v60.235294zM963.764706 1024h60.235294v-60.235294h-60.235294v60.235294z m0-843.294118h60.235294V120.470588h-60.235294v60.235294z m0 722.82353h60.235294v-60.235294h-60.235294v60.235294z m0-481.882353h60.235294V361.411765h-60.235294v60.235294z m0-120.470588h60.235294V240.941176h-60.235294v60.235295z m0 240.941176h60.235294V481.882353h-60.235294v60.235294z m0 120.470588h60.235294v-60.235294h-60.235294v60.235294z m0 120.470589h60.235294v-60.235295h-60.235294v60.235295z m0-783.058824v60.235294h60.235294V0h-60.235294z m-107.038118 60.235294h53.549177V0h-53.549177v60.235294z m-107.098353 0h53.549177V0h-53.549177v60.235294z m-107.098353 0h53.549177V0h-53.549177v60.235294zM535.431529 60.235294h53.549177V0h-53.549177v60.235294zM421.647059 60.235294h60.235294V0H421.647059v60.235294z m0 843.294118h60.235294v-60.235294H421.647059v60.235294z m0-120.470588h60.235294v-60.235295H421.647059v60.235295z m0-361.411765h60.235294V361.411765H421.647059v60.235294z m0 240.941176h60.235294v-60.235294H421.647059v60.235294z m0-361.411764h60.235294V240.941176H421.647059v60.235295z m0-120.470589h60.235294V120.470588H421.647059v60.235294z m0 361.411765h60.235294V481.882353H421.647059v60.235294z"
                p-id="19660"
              ></path>
            </SvgButton>
            {/* 只展示编辑 */}
            <SvgButton
              viewBox="0 0 1024 1024"
              btnWidth={42}
              width={20}
              height={20}
              onClick={() => {}}
            >
              <path
                d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"
                p-id="20937"
              ></path>
              <path
                d="M355.9 534.9L354 653.8c-0.1 8.9 7.1 16.2 16 16.2h0.4l118-2.9c2-0.1 4-0.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-415.8 415c-1.4 1.5-2.3 3.5-2.3 5.6z m63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1 0.7-46.4z"
                p-id="20938"
              ></path>
            </SvgButton>
            {/* 只展示预览 */}
            <SvgButton
              viewBox="0 0 1024 1024"
              btnWidth={42}
              width={20}
              height={20}
              onClick={() => {}}
            >
              <path
                d="M800 928H224c-70.692 0-128-57.308-128-128V224c0-70.692 57.308-128 128-128h576c70.692 0 128 57.308 128 128v576c0 70.692-57.308 128-128 128z m64-704c0-35.346-28.654-64-64-64H224c-35.346 0-64 28.654-64 64v576c0 35.346 28.654 64 64 64h576c35.346 0 64-28.654 64-64V224z"
                p-id="25434"
              ></path>
            </SvgButton>
            {/* 展示手机预览 */}
            <SvgButton
              viewBox="0 0 1024 1024"
              btnWidth={42}
              width={20}
              height={20}
              onClick={() => {}}
            >
              <path
                d="M768 64a64 64 0 0 1 64 64v768a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h512z m-32 64H288a32 32 0 0 0-32 32v704a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32z m-223.488 608a48 48 0 1 1 0 96 48 48 0 0 1 0-96z"
                fill="#000000"
                p-id="26505"
              ></path>
            </SvgButton>
          </div>
        </>
      }
    ></Header>
  )
}

export default PenHeader
