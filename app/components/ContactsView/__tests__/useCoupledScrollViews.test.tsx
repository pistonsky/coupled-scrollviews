import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { withReanimatedTimer, advanceAnimationByTime } from 'react-native-reanimated/lib/reanimated2/jestUtils';
import { render, fireEvent } from '@testing-library/react-native';
import useCoupledScrollViews from 'react-native-coupled-scrollviews';

const ITEM_WIDTH = 10;
const ITEM_HEIGHT = 25;

const scrollTo = jest.fn();

function TestComponent() {
  const [isActive, itemWidth, itemHeight, scrollHandlerA, scrollHandlerB, scrollA, scrollB] =
    useCoupledScrollViews(scrollTo);

  const animatedStyleA = useAnimatedStyle(() => ({ width: scrollA.value }));
  const animatedStyleB = useAnimatedStyle(() => ({ width: scrollB.value }));
  const animatedStyleIsActive = useAnimatedStyle(() => ({ width: isActive.value }));

  itemWidth.value = ITEM_WIDTH;
  itemHeight.value = ITEM_HEIGHT;

  return (
    <View>
      <Animated.View testID="A" style={animatedStyleA} />
      <Animated.View testID="B" style={animatedStyleB} />
      <Animated.View testID="isActive" style={animatedStyleIsActive} />
      <Animated.ScrollView testID="scroll-view-A" onScroll={scrollHandlerA} />
      <Animated.ScrollView testID="scroll-view-B" onScroll={scrollHandlerB} />
    </View>
  );
}

describe('Synchronization of ScrollViews', () => {
  it('should scroll both ScrollViews together proportionally', () => {
    withReanimatedTimer(() => {
      const { getByTestId } = render(<TestComponent />);
      const scrollOffsetA = getByTestId('A');
      const scrollOffsetB = getByTestId('B');
      const scrollViewA = getByTestId('scroll-view-A');
      const scrollViewB = getByTestId('scroll-view-B');
      fireEvent.scroll(scrollViewA, {
        nativeEvent: { contentOffset: { x: ITEM_WIDTH } },
      });
      advanceAnimationByTime(100);
      expect(scrollOffsetA).toHaveAnimatedStyle({ width: ITEM_WIDTH });
      expect(scrollTo.mock.calls.length).toBe(1);
      expect(scrollTo.mock.calls[0][2]).toBe(ITEM_HEIGHT);
      fireEvent.scroll(scrollViewB, {
        nativeEvent: { contentOffset: { y: ITEM_HEIGHT * 2 } },
      });
      advanceAnimationByTime(100);
      expect(scrollOffsetB).toHaveAnimatedStyle({ width: ITEM_HEIGHT * 2 });
      expect(scrollTo.mock.calls.length).toBe(2);
      expect(scrollTo.mock.calls[1][1]).toBe(ITEM_WIDTH * 2);
    });
  });

  it('should set active value when in mid-scroll state', () => {
    withReanimatedTimer(() => {
      const { getByTestId } = render(<TestComponent />);
      const isActive = getByTestId('isActive');
      const scrollViewB = getByTestId('scroll-view-B');
      fireEvent.scroll(scrollViewB, {
        nativeEvent: { contentOffset: { y: ITEM_WIDTH / 2 } },
      });
      advanceAnimationByTime(100);
      expect(isActive).toHaveAnimatedStyle({ width: 1 });
    });
  });

  it('should reset active value when snapped to item', () => {
    withReanimatedTimer(() => {
      const { getByTestId } = render(<TestComponent />);
      const isActive = getByTestId('isActive');
      const scrollViewB = getByTestId('scroll-view-B');
      fireEvent.scroll(scrollViewB, {
        nativeEvent: { contentOffset: { y: ITEM_HEIGHT / 2 } },
      });
      advanceAnimationByTime(100);
      expect(isActive).toHaveAnimatedStyle({ width: 1 });
      fireEvent.scroll(scrollViewB, {
        nativeEvent: { contentOffset: { y: ITEM_HEIGHT } },
      });
      advanceAnimationByTime(100);
      expect(isActive).toHaveAnimatedStyle({ width: 0 });
    });
  });
});
