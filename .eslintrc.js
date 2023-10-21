/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    "plugin:mdx/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
  root: true,
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      // remove newline between import groups
      { groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]] },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],
  },
  settings: {
    "mdx/code-blocks": true,
    "mdx/language-mapper": {},
  },
};

module.exports = config;
