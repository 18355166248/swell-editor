import { Popover, Switch, Transition, Listbox } from "@headlessui/react"
import { SettingOutlined } from "@ant-design/icons"
import { Fragment } from "react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

const themeConfig = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
]

interface ThemeValueProps {
  isMac: boolean
  markdownTheme: string
}

interface ThemeSettingProps {
  value: ThemeValueProps
  onChange: (val: ThemeValueProps) => void
}

function ThemeSetting({ value, onChange }: ThemeSettingProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
          ${open ? "" : "text-opacity-90"}
          group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  <label>主题: </label>
                  <ThemeSelector
                    value={value.markdownTheme}
                    onChange={(markdownTheme: string) =>
                      onChange({ ...value, markdownTheme })
                    }
                  />
                </div>
                <div className="bg-gray-50 p-4">
                  Mac 风格:
                  <Switch
                    checked={value.isMac}
                    className={`${
                      value.isMac ? "bg-sky-500" : "bg-sky-500/40"
                    }  inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        value.isMac ? "translate-x-6" : "translate-x-1"
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

function ThemeSelector({ value, onChange }: { value: string; onChange: any }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate">{}</span>
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
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {themeConfig.map((person, personIdx) => (
            <Listbox.Option
              key={personIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                }`
              }
              value={person}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {person.name}
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
    </Listbox>
  )
}

export default ThemeSetting
