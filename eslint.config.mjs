import globals from "globals"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import path from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import pluginJs from "@eslint/js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
})

const eslintConfigurations = [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("standard"),
  pluginReactConfig,
]

export default eslintConfigurations
