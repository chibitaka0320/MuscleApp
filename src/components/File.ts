export const getExtention = (path: string): string => {
  const extention = path.split('.').pop()
  if (extention === undefined) {
    return ''
  } else {
    return extention
  }
}
