export function getFallbackName(name: string) {
  let fallbackName = ''

  name.split(' ').forEach((element) => {
    if (fallbackName.length >= 2) {
      return fallbackName
    }

    fallbackName = fallbackName + element.slice(0, 1)
  })

  return fallbackName
}
