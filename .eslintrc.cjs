module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: ["react", "react-hooks"],
  env: {
    es2022: true,
    node: true
  },
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ["error", "never"],
    "no-console": "error",
    "no-implicit-globals": "error",
    "no-warning-comments": ["error", { terms: ["fixme", "todo"] }],
    "newline-before-return": "error",
    curly: "error",
    "padded-blocks": ["error", "never"],
    "space-before-blocks": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["break", "case", "cjs-export", "class", "continue", "do", "if", "switch", "try", "while", "return"]
      },
      {
        blankLine: "always",
        prev: ["break", "case", "cjs-export", "class", "continue", "do", "if", "switch", "try", "while", "return"],
        next: "*"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  settings: { react: { version: "detect" } },
  globals: {
    localStorage: "readonly",
    alert: "readonly",
    window: "readonly"
  },
  overrides: [
    {
      files: ["**/*.jsx", "**/*.cjs", "**/*.mjs", "**/*.js"], // Inclut tous les fichiers .jsx, .cjs, .mjs et .js
      parserOptions: {
        sourceType: "module"
      }
    }
  ]
}
