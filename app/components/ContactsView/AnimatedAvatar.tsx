import * as React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import Animated, { runOnUI, scrollTo, useAnimatedStyle } from 'react-native-reanimated';

import type { AnimatedAvatarProps } from './types';
import styles, { AVATAR_WIDTH } from './styles';

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  index,
  highlightColor,
  activeScale,
  animatedScrollOffset,
  containerScrollViewRef,
  name,
  image,
  onPress,
}) => {
  const animatedAvatarContainerStyles: {
    backgroundColor: string;
    transform: [{ scale: number }];
  } = useAnimatedStyle(() => {
    const distance = Math.abs(animatedScrollOffset.value - index * AVATAR_WIDTH);
    if (distance >= AVATAR_WIDTH) {
      return {
        backgroundColor: highlightColor + '00',
        transform: [{ scale: 1 }],
      };
    }
    let factor = (AVATAR_WIDTH - distance) / AVATAR_WIDTH;
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
      transform: [{ scale: 1 + factor * (activeScale - 1) }],
    };
  });

  return (
    <TouchableWithoutFeedback
      testID={`avatar-container-${index}`}
      onPress={() => {
        runOnUI((offset: number) => {
          'worklet';
          scrollTo(containerScrollViewRef, offset, 0, true);
        })(index * AVATAR_WIDTH);
        const distance = Math.abs(animatedScrollOffset.value - index * AVATAR_WIDTH);
        if (distance < 1) {
          onPress(index);
        }
      }}>
      <Animated.View accessibilityLabel={name} style={[styles.avatarContainer, animatedAvatarContainerStyles]}>
        <Image style={styles.avatar} source={image} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedAvatar;
