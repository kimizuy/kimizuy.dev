import type { Frontmatter, Preview } from './../types/post'

const isString = (value: unknown): value is string => typeof value === 'string'
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
type ArrayCheckOption = 'all' | 'first'
const isArray =
  <T>(
    childCheckFn:
      | ((value: unknown) => value is T)
      | ((value: unknown) => boolean),
    checkOption: ArrayCheckOption = 'all'
  ) =>
  (array: unknown): boolean =>
    Array.isArray(array) &&
    (checkOption === 'all'
      ? ((array) => {
          for (const val of array) {
            if (!childCheckFn(val)) return false
          }
          return true
        })(array)
      : typeof array[0] === 'undefined' || childCheckFn(array[0]))

export const isFrontmatter = (arg_0: unknown): arg_0 is Frontmatter =>
  isObject(arg_0) &&
  'title' in arg_0 &&
  isString(arg_0['title']) &&
  'description' in arg_0 &&
  isString(arg_0['description']) &&
  'publishedAt' in arg_0 &&
  isString(arg_0['publishedAt']) &&
  'tags' in arg_0 &&
  ((arg_1: unknown): boolean => isArray(isString)(arg_1))(arg_0['tags']) &&
  'image' in arg_0 &&
  isString(arg_0['image'])

export const isPreview = (arg_0: unknown): arg_0 is Preview =>
  isObject(arg_0) &&
  'slug' in arg_0 &&
  isString(arg_0['slug']) &&
  'code' in arg_0 &&
  isString(arg_0['code']) &&
  'frontmatter' in arg_0 &&
  isFrontmatter(arg_0['frontmatter'])
