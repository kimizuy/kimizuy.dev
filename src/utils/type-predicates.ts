import type { Frontmatter, MDXExport } from './../types/post';

const isString = (value: unknown): value is string => typeof value === 'string';
const isDate = (value: unknown): value is Date =>
  value instanceof Date || Object.prototype.toString.call(value) === '[Object Date]'
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
type ArrayCheckOption = 'all' | 'first';
const isArray = <T>(
  childCheckFn:
    | ((value: unknown) => value is T)
    | ((value: unknown) => boolean),
  checkOption: ArrayCheckOption = 'all'
) => (array: unknown): boolean =>
  Array.isArray(array) &&
  (checkOption === 'all'
    ? ((array) => {
        for (const val of array) {
          if (!childCheckFn(val)) return false
        }
        return true;
      })(array)
    : typeof array[0] === "undefined" || childCheckFn(array[0]));

export const isFrontmatter = (arg_0: unknown): arg_0 is Frontmatter => isObject(arg_0) && 
  ('title' in arg_0 && (isString)(arg_0['title'])) && ('description' in arg_0 && (isString)(arg_0['description'])) && ('publishedAt' in arg_0 && (isDate)(arg_0['publishedAt'])) && ('tags' in arg_0 && ((arg_1: unknown): boolean => isArray(isString)(arg_1))(arg_0['tags']));
export function assertIsFrontmatter(value: unknown): asserts value is Frontmatter {
  if (!isFrontmatter(value)) throw new TypeError(`value must be Frontmatter but received ${value}`)
};
export const isMDXExport = (arg_0: unknown): arg_0 is MDXExport => isObject(arg_0) && 
  ('cover' in arg_0 && (isString)(arg_0['cover']));
export function assertIsMDXExport(value: unknown): asserts value is MDXExport {
  if (!isMDXExport(value)) throw new TypeError(`value must be MDXExport but received ${value}`)
};