export function isClassElement(element: any) {
  return typeof element === "function" && element.prototype.isReactComponent
}

export function isFunctionElement(element: any) {
  return (
    typeof element === "function" &&
    String(element).includes("React.createElement")
  )
}

export function isReactElement(element: any) {
  return isFunctionElement(element) || isClassElement(element)
}

export function validateReactComponents(list: any[]) {
  return list.every((item) => isReactElement(item))
}
