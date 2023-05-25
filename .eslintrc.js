module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': 'off',
    'arrow-body-style': 'off',
    'react/jsx-filename-extension': 0,
    'no-unused-vars': 'off',
    'treact/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-console': 'off',
    'react/button-has-type': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-return': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'no-new': 'off',
    'prefer-const': 'off',
  },
};
