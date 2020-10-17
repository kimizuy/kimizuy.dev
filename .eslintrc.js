module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prefer-arrow'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'airbnb-typescript',
    // Uncomment the following lines to enable eslint-config-prettier
    // Is not enabled right now to avoid issues with the Next.js repo
    // 'prettier',
    // 'prettier/@typescript-eslint',
  ],
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    '@typescript-eslint/semi': 0,

    '@typescript-eslint/explicit-module-boundary-types': [
      1,
      {
        allowedNames: ['render', 'getInitialProps'],
      },
    ],
    // アロー関数のみ使う
    'prefer-arrow/prefer-arrow-functions': [
      1,
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
}
