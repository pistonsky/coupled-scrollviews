import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  useAnimatedReaction,
  withTiming,
  scrollTo,
} from 'react-native-reanimated';

import AnimatedAvatar from './AnimatedAvatar';
import type { Contact, Lock } from './types';
import styles, { SIZE, HEIGHT } from './styles';

const AVATARS: number = 0;
const DETAILS: number = 1;

const ContactsView: React.FC<{ data: Contact[] }> = ({ data }) => {
  const [detailsHeight, setDetailsHeight] = React.useState<number>(0);
  const detailsHeightValue: Animated.SharedValue<number> =
    useSharedValue<number>(0);
  const translationX: Animated.SharedValue<number> = useSharedValue<number>(0);
  const scrollX: Animated.SharedValue<number> = useSharedValue<number>(0);
  const scrollY: Animated.SharedValue<number> = useSharedValue<number>(0);
  const shadowOpacity: Animated.SharedValue<number> = useSharedValue<number>(0);
  const lock: Animated.SharedValue<Lock> = useSharedValue<Lock>({
    type: null,
    timestamp: null,
  });
  const avatarsScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const detailsScrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandlerForAvatars = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
    if (
      lock.value.timestamp === null ||
      lock.value.type === AVATARS ||
      new Date().getTime() - lock.value.timestamp > 83
    ) {
      lock.value = { type: AVATARS, timestamp: new Date().getTime() };
      scrollX.value = event.contentOffset.x;
    }
  });

  const scrollHandlerForDetails = useAnimatedScrollHandler(event => {
    if (
      lock.value.timestamp === null ||
      lock.value.type === DETAILS ||
      new Date().getTime() - lock.value.timestamp > 83
    ) {
      lock.value = { type: DETAILS, timestamp: new Date().getTime() };
      scrollY.value = event.contentOffset.y;
    }
    const linesUp = event.contentOffset.y % detailsHeightValue.value < 1;
    if (shadowOpacity.value === 0 && !linesUp) {
      shadowOpacity.value = 1;
    } else if (linesUp) {
      shadowOpacity.value = 0;
    }
  });

  useAnimatedReaction(
    () => {
      const avatarsOffset = (scrollY.value / detailsHeightValue.value) * SIZE;
      const detailsOffset = (scrollX.value * detailsHeightValue.value) / SIZE;
      return { avatarsOffset, detailsOffset };
    },
    ({ avatarsOffset, detailsOffset }) => {
      if (lock.value.type === DETAILS) {
        scrollTo(avatarsScrollViewRef, avatarsOffset, 0, false);
      } else if (lock.value.type === AVATARS) {
        scrollTo(detailsScrollViewRef, 0, detailsOffset, false);
      }
    },
  );

  const animatedShadowOpacityStyles = useAnimatedStyle(() => ({
    opacity: withTiming(shadowOpacity.value, { duration: 400 }),
  }));

  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        setDetailsHeight(height - HEIGHT);
        detailsHeightValue.value = height - HEIGHT;
      }}>
      <View>
        <Animated.View
          style={[styles.shadowBackground, animatedShadowOpacityStyles]}
        />
        <Animated.ScrollView
          ref={avatarsScrollViewRef}
          style={styles.avatarsFlatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          snapToInterval={SIZE}
          decelerationRate="fast"
          scrollToOverflowEnabled
          onScroll={scrollHandlerForAvatars}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <AnimatedAvatar
              key={item.id.toString()}
              index={index}
              highlightColor="#AAAAFF"
              animatedScrollOffset={translationX}
              containerScrollViewRef={avatarsScrollViewRef}
              image={item.profileImageSource}
            />
          ))}
        </Animated.ScrollView>
      </View>
      {!!detailsHeight && (
        <Animated.ScrollView
          ref={detailsScrollViewRef}
          style={{ height: detailsHeight }}
          scrollToOverflowEnabled
          onScroll={scrollHandlerForDetails}
          scrollEventThrottle={16}
          {...Platform.select({
            ios: {
              pagingEnabled: true,
              decelerationRate: 'fast',
            },
            android: {
              snapToInterval: detailsHeight,
            },
          })}>
          {data.map(item => (
            <View key={item.id.toString()} style={{ height: detailsHeight }}>
              <Text style={styles.name}>
                <Text style={styles.firstName}>{item.firstName}</Text>
                {`\xa0${item.lastName}`}
              </Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.heading}>About me</Text>
              <Text style={styles.bio}>{item.bio}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default ContactsView;
