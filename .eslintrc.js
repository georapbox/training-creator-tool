module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: [
    // 'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    // 'prettier'
    // 'plugin:react-hooks/recommended'
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  plugins: [
    'react'
    // 'react-hooks'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // ---------------------------------------
    // Stylistic Issues
    // ---------------------------------------
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral'],
        flatTernaryExpressions: false
      }
    ],
    quotes: [
      'warn',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1
      }
    ],
    'no-trailing-spaces': ['warn'],
    'comma-spacing': ['warn'],
    'comma-style': ['warn'],
    'operator-linebreak': ['warn', 'before'],
    'brace-style': ['warn'],
    'keyword-spacing': ['warn'],
    'object-curly-spacing': ['warn', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'spaced-comment': ['warn', 'always'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'padded-blocks': ['warn', 'never'],
    'comma-dangle': ['warn', 'never'],
    semi: 'off',
    'space-in-parens': ['warn', 'never'],
    curly: ['warn'],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    'no-multi-spaces': [
      'warn',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: false
        }
      }
    ],
    'prefer-const': 'warn',
    'no-var': 'warn',

    // React specific rules
    'react/prop-types': 'off',
    'react/no-find-dom-node': 'off',
    'react/jsx-key': ['error']
  },
  overrides: [],
  ignorePatterns: []
};
