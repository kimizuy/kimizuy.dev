export const dateSortDesc = (
  a: string | number,
  b: string | number
): number => {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export const getSrcName = (src: string): string => {
  const srcName = src.split('/')[src.split('/').length - 1].split('.')[0]
  return srcName
}
