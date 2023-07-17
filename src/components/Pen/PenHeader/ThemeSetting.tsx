import { Popover, Switch, Transition, Listbox } from "@headlessui/react"
import { SettingOutlined } from "@ant-design/icons"
import { Fragment } from "react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { usePenContext } from "../IndexProvider"
import { THEME_KEY, themes, themesKeys } from "@/css/markdown-theme"
import clsx from "clsx"

function ThemeSetting() {
  const { globalState, setGlobalState } = usePenContext()

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              "ring-1 ring-gray-900/5 shadow-sm hover:bg-gray-50 dark:ring-0 dark:shadow-highlight/4 dark:bg-gray-500 dark:hover:bg-gray-400",
              "group focus:outline-none focus-visible:ring-2 rounded-md overflow-hidden",
              "w-9 h-9 flex justify-center items-center",
              "text-gray-600 dark:text-gray-700",
              open
                ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
                : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
            )}
          >
            <SettingOutlined />
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
            <Popover.Panel className="absolute right-0 z-10 bg-white mt-1 max-w-sm sm:px-0 w-60 dark:bg-gray-800 dark:ring-0 dark:text-gray-300 dark:shadow-highlight/4">
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
                <div className="">
                  <label className="pr-2">Mac 风格:</label>
                  <Switch
                    checked={globalState.isMac}
                    className={`${
                      globalState.isMac ? "bg-sky-500" : "bg-sky-500/40"
                    }  inline-flex h-6 w-11 items-center rounded-full`}
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
      <div className="relative flex-auto z-10">
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

export default ThemeSetting
