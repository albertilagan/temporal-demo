/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@repo/eslint-config"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json", // or the path to your tsconfig file
  },
};

module.exports = config;
