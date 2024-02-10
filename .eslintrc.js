module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ['src/database/migrations'],
  plugins: [
    "@typescript-eslint/eslint-plugin",
     "unused-imports",
     "modules-newline"
    ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment" : "off",
    "import/no-extraneous-dependencies": "off",
    "linebreak-style": "off",
    "no-tabs": "off",
    "object-curly-spacing": ["error", "always"],
    "semi": ["error", "always"],
    "@typescript-eslint/indent": [
        "error",
        4,
        {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1,
        },
    ],
    "comma-dangle": ["error", "always"],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/type-annotation-spacing": ["error",{"before": true, "after": true}],
    "lines-between-class-members" : ["error", "always"],
    "import/no-unresolved": [ 
      2, 
      { "caseSensitive": false, ignore : ["."] }
   ],
   "import/order": ["error", {"alphabetize": {"order": "asc", "caseInsensitive": true}}],
   "import/no-unused-modules": [1, {"unusedExports": true}],
   "comma-spacing": ["error", { "before": false, "after": true }],
    "no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': [
      'warn', 
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'key-spacing': 
    [
      "error", 
      { 
        "align": {
          "beforeColon": true,
          "afterColon": true,
          "on": "colon"
        }
      }
    ], 
   "unused-imports/no-unused-imports": "error",
   "max-len": ["error", { "code": 150, "tabWidth": 2 }],
   "function-call-argument-newline": ["error", "consistent"],
   "lines-between-class-members": ["error", "always"],
   "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }],
   "prefer-const" : ["error",{"destructuring": "all"}],
   "space-infix-ops": ["error", { "int32Hint": false }],
   "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": false }],
   "object-curly-newline": ["error", {
    "ObjectExpression": { "multiline": true, "minProperties": 1 },
    "ObjectPattern": { "multiline": true },
    "ImportDeclaration": { "minProperties": 2,"multiline": true, "consistent" : true},
    "ExportDeclaration": { "multiline": true, "minProperties": 3 }
 }],
 "modules-newline/export-declaration-newline": "error",
 "quotes" : ["error", "double"],
 "eol-last": ["error", "always"]
  }
};
