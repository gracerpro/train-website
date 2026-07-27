import js from "@eslint/js"
import eslintPluginVue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"
import pluginVitest from "@vitest/eslint-plugin"
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting"
import tsEslint from "typescript-eslint"
import globals from "globals"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],

  {
    files: ["src/**/*.ts", "server.ts", "prerender.ts"],
    languageOptions: {
      parser: tsEslint.parser,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
    },
  },

  {
    files: ["src/**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        tsconfigRootDir: __dirname, // Adjust if tsconfig.json is not in the root
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: true,
        },
      ],
      "vue/no-v-html": "off",
    },
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/*__tests__/*"],
  },

  skipFormattingConfig,
]
