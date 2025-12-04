import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**/*", "node_modules/**/*"],
  },
  // Load standard configs using FlatCompat
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  // Manually configure Next.js to avoid "name" property validation error in FlatCompat
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"]?.rules,
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
    },
  },
  {
    // Ensure React version detection is enabled
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;