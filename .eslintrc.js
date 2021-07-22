module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import', 'detox'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '/',
      },
    },
  },
};
