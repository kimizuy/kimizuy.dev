const path = require("path")

module.exports = {
  stories: ["../stories/**/*.stories.js", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  presets: [path.resolve(__dirname, "./next-preset.js")],
}
