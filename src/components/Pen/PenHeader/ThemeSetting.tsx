import { Popover, Switch, Transition, Listbox } from "@headlessui/react"
import { Fragment } from "react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { usePenContext } from "../IndexProvider"
import { THEME_KEY, themes, themesKeys } from "@/css/markdown-theme"
import clsx from "clsx"
import {
  CodeThemesKeysType,
  codeThemes,
  codeThemesKeys,
} from "@/css/prism-themes"

function ThemeSetting() {
  const { globalState, setGlobalState } = usePenContext()

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              "shadow-sm",
              "ring-1 ring-gray-900/5",
              "dark:bg-gray-800 dark:hover:bg-gray-700 ",
              "group focus:outline-none rounded-md",
              "w-9 h-9 flex justify-center items-center"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-sky-500 fill-sky-100 group-hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:group-hover:stroke-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 bg-white mt-1 max-w-sm sm:px-0 w-80 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:shadow-highlight/4">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 px-6 py-3">
                <div className="relative flex items-center mb-6">
                  <label className="pr-2">主题: </label>
                  <ThemeSelector
                    themesData={themes}
                    value={globalState.markdownTheme}
                    onChange={(markdownTheme: THEME_KEY) =>
                      setGlobalState({ ...globalState, markdownTheme })
                    }
                  />
                </div>
                <div className="relative flex items-center mb-6">
                  <label className="pr-2">代码: </label>
                  <CodeThemeSelector
                    codeThemesData={codeThemes}
                    value={globalState.codeTheme}
                    onChange={(codeTheme: CodeThemesKeysType) =>
                      setGlobalState({ ...globalState, codeTheme })
                    }
                  />
                </div>
                <div className="">
                  <label className="pr-2">Mac 风格:</label>
                  <Switch
                    checked={globalState.isMac}
                    className={`${
                      globalState.isMac ? "bg-sky-500" : "bg-sky-500/40"
                    }  inline-flex h-6 w-11 items-center rounded-full`}
                    onChange={(checked) => {
                      setGlobalState({ isMac: checked })
                    }}
                  >
                    <span
                      className={`${
                        globalState.isMac ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

function ThemeSelector({
  value,
  onChange,
  themesData,
}: {
  value: THEME_KEY
  onChange: any
  themesData: typeof themes
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative flex-auto z-20">
        <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none border-gray-200 border dark:border-gray-700">
          <span className="block truncate">{themesData[value].name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base ring-1 text-gray-900 dark:text-white bg-white dark:bg-gray-900">
            {themesKeys.map((key) => (
              <Listbox.Option
                key={key}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4`
                }
                value={key}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {themesData[key].name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

function CodeThemeSelector({
  value,
  onChange,
  codeThemesData,
}: {
  value: CodeThemesKeysType
  onChange: any
  codeThemesData: typeof codeThemes
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative flex-auto z-10">
        <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none border-gray-200 border dark:border-gray-700">
          <span className="block truncate">{codeThemesData[value].name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base ring-1 text-gray-900 dark:text-white bg-white dark:bg-gray-900">
            {codeThemesKeys.map((key) => (
              <Listbox.Option
                key={key}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4`
                }
                value={key}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {codeThemesData[key].name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ThemeSetting
