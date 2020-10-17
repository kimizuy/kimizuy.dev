// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dateSortDesc = (a: string | number, b: string | number) => {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
