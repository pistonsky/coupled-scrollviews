import { RefObject } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
  useAnimatedReaction,
  scrollTo,
} from 'react-native-reanimated';

import type { Lock } from './types';

const useCoupledScrollViews: (
  mockedScrollTo?: (ref: RefObject<Animated.ScrollView>, x: number, y: number, animated: boolean) => void,
) => [
  Animated.SharedValue<number>,
  Animated.SharedValue<number>,
  Animated.SharedValue<number>,
  (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  Animated.SharedValue<number>,
  Animated.SharedValue<number>,
  React.RefObject<Animated.ScrollView>,
  React.RefObject<Animated.ScrollView>,
] = (mockedScrollTo?: (ref: RefObject<Animated.ScrollView>, x: number, y: number, animated: boolean) => void) => {
  const scrollA: Animated.SharedValue<number> = useSharedValue<number>(0);
  const scrollB: Animated.SharedValue<number> = useSharedValue<number>(0);
  const scrollX: Animated.SharedValue<number> = useSharedValue<number>(0);
  const scrollY: Animated.SharedValue<number> = useSharedValue<number>(0);
  const itemHeight: Animated.SharedValue<number> = useSharedValue<number>(0);
  const itemWidth: Animated.SharedValue<number> = useSharedValue<number>(0);
  const lock: Animated.SharedValue<Lock> = useSharedValue<Lock>({
    type: null,
    timestamp: null,
  });
  const scrollViewARef: React.RefObject<Animated.ScrollView> = useAnimatedRef<Animated.ScrollView>();
  const scrollViewBRef: React.RefObject<Animated.ScrollView> = useAnimatedRef<Animated.ScrollView>();
  const isActive: Animated.SharedValue<number> = useSharedValue<number>(0);

  const scrollHandlerA = useAnimatedScrollHandler(event => {
    scrollA.value = event.contentOffset.x;
    if (lock.value.timestamp === null || lock.value.type === 0 || new Date().getTime() - lock.value.timestamp > 83) {
      lock.value = { type: 0, timestamp: new Date().getTime() };
      scrollX.value = event.contentOffset.x;
    }
  });

  const scrollHandlerB = useAnimatedScrollHandler(event => {
    scrollB.value = event.contentOffset.y;
    if (lock.value.timestamp === null || lock.value.type === 1 || new Date().getTime() - lock.value.timestamp > 83) {
      lock.value = { type: 1, timestamp: new Date().getTime() };
      scrollY.value = event.contentOffset.y;
    }
    const linesUp = event.contentOffset.y % itemHeight.value < 1;
    if (isActive.value === 0 && !linesUp) {
      isActive.value = 1;
    } else if (linesUp) {
      isActive.value = 0;
    }
  });

  useAnimatedReaction(
    () => {
      const offsetA = (scrollY.value / itemHeight.value) * itemWidth.value;
      const offsetB = (scrollX.value * itemHeight.value) / itemWidth.value;
      return { offsetA, offsetB };
    },
    ({ offsetA, offsetB }) => {
      if (lock.value.type === 1) {
        (mockedScrollTo || scrollTo)(scrollViewARef, offsetA, 0, false);
      } else if (lock.value.type === 0) {
        (mockedScrollTo || scrollTo)(scrollViewBRef, 0, offsetB, false);
      }
    },
  );

  return [
    isActive,
    itemWidth,
    itemHeight,
    scrollHandlerA,
    scrollHandlerB,
    scrollA,
    scrollB,
    scrollViewARef,
    scrollViewBRef,
  ];
};

export default useCoupledScrollViews;
