import * as React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { AnimatedAvatarProps } from './types';
import styles, { SIZE } from './styles';

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  index,
  highlightColor,
  animatedScrollOffset,
  containerScrollViewRef,
  image,
}) => {
  const animatedAvatarContainerStyles: {
    backgroundColor: string;
    transform: [{ scale: number }];
  } = useAnimatedStyle(() => {
    const distance = Math.abs(animatedScrollOffset.value - index * SIZE);
    if (distance >= SIZE) {
      return {
        backgroundColor: highlightColor + '00',
        transform: [{ scale: 1 }],
      };
    }
    let factor = (SIZE - distance) / SIZE;
    if (factor < 0) {
      factor = 0;
    }
    factor *= factor * factor;
    const opacity = 255 * factor;
    let hexOpacity = Math.floor(opacity).toString(16);
    if (hexOpacity.length === 1) {
      hexOpacity = '0' + hexOpacity;
    }
    return {
      backgroundColor: highlightColor + hexOpacity,
      transform: [{ scale: 1 + factor * 0.1 }],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        runOnUI((offset: number) => {
          'worklet';
          scrollTo(containerScrollViewRef, offset, 0, true);
        })(index * SIZE);
      }}>
      <Animated.View
        style={[styles.avatarContainer, animatedAvatarContainerStyles]}>
        <Image style={styles.avatar} source={image} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedAvatar;
