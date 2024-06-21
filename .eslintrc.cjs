module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "max-len": ["error", { code: 100 }],
    "object-property-newline": "error",
    quotes: ["error", "double"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-param-reassign": [0],
    "linebreak-style": ["off", "windows"],
    "import/no-unresolved": [0],
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    camelcase: "off",
    "no-underscore-dangle": "off",
    "no-console": "off",
    "no-shadow": "off",
    "no-await-in-loop": "off",
  },
};
