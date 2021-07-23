module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './app/components',
          '@screens': './app/screens',
          'react-native-coupled-scrollviews': './app/lib/react-native-coupled-scrollviews',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
