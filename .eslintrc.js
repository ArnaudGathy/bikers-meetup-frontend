module.exports = {
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "next",
    "next/core-web-vitals",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  rules: {
    /* TS overrides */
    "no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    /* TS overrides */

    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
