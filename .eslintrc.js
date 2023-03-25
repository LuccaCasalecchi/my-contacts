module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'object-curly-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-promise-executor-return': 'off',
    'padded-blocks': 'off',
    camelcase: 'off',
    'no-multiple-empty-lines': 'off',
  },
};
