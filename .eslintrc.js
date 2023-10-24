/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    "next/core-web-vitals",
    "plugin:mdx/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "simple-import-sort/imports": [
      "error",
      // remove newline between import groups
      { groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]] },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],
    // copy from t3stack
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
  settings: {
    "mdx/code-blocks": true,
    "mdx/language-mapper": {},
  },
  ignorePatterns: ["type-predicates.ts", "*.js", "*.md", "*.mdx"],
};

module.exports = config;
