/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: ["next/core-web-vitals", "plugin:mdx/recommended"],
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
  },
  settings: {
    "mdx/code-blocks": true,
    "mdx/language-mapper": {},
  },
};

module.exports = config;
