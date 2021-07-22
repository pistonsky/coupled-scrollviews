require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

import 'react-native-gesture-handler/jestSetup';

// As of react-native@0.64.X file has moved
// eslint-disable-next-line no-undef
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
