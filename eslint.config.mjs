import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config({
    plugins: ["prettier", "import-helpers"],
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    ignorePatterns: ["tailwind.config.ts"],
    rules: {
      semi: "off",
      quotes: ["error", "double"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "import-helpers/order-imports": [
        "error",
        {
          newlinesBetween: "always",
          groups: [
            "/^next/",
            "module",
            "/^~/",
            "/^@shared/",
            ["parent", "sibling", "index"]
          ],
          alphabetize: { order: "asc", ignoreCase: true }
        }
      ]
    }
  })
]

export default eslintConfig
