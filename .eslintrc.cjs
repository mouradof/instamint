module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // Ensures we use the recommended rules for React
    "next", // Next.js specific linting rules
    "prettier" // This should come last to override other configurations
  ],
  plugins: [
    "react", // Enables react-specific linting rules
    "react-hooks" // Enables rules for React hooks
  ],
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Your specific rules here
  },
  settings: {
    react: {
      version: "detect" // Automatically detect the version of React to use
    }
  }
};
