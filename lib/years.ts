import { getFileNames, getFrontMatter } from "./util"
import { parseISO, format } from "date-fns"

const fileNames = getFileNames()

export function getSelectedYearData(selectedYear: string) {
  const selectedYearData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "")
    const matterData = getFrontMatter(fileName)
    const date = matterData.date
    const year = format(parseISO(date), "yyyy")
    if (year === selectedYear) {
      return {
        id,
        ...matterData,
      }
    }
  })

  return selectedYearData.filter(Boolean).sort((a, b) => {
    if (a!.date < b!.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllYears() {
  const years = fileNames.map((fileName) => {
    const matterData = getFrontMatter(fileName)
    const date = matterData.date
    const year = format(parseISO(date), "yyyy")
    return year
  })

  return years.map((year) => {
    return {
      params: {
        year,
      },
    }
  })
}
