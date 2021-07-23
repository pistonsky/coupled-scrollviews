import { RefObject } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated from 'react-native-reanimated';

export declare type Lock = {
  type: number | null;
  timestamp: number | null;
};

export declare type CoupledScrollViewsHookResult = [
  isActive: Animated.SharedValue<number>,
  itemWidth: Animated.SharedValue<number>,
  itemHeight: Animated.SharedValue<number>,
  scrollHandlerA: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  scrollHandlerB: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  scrollA: Animated.SharedValue<number>,
  scrollB: Animated.SharedValue<number>,
  scrollViewARef: React.RefObject<Animated.ScrollView>,
  scrollViewBRef: React.RefObject<Animated.ScrollView>,
];

export declare type ScrollToCallback = (
  ref: RefObject<Animated.ScrollView>,
  x: number,
  y: number,
  animated: boolean,
) => void;

export declare type CoupledScrollViewsHook = (mockedScrollTo?: ScrollToCallback) => CoupledScrollViewsHookResult;
