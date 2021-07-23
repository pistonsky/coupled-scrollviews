import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import AnimatedAvatar from './AnimatedAvatar';
import useCoupledScrollViews from './useCoupledScrollViews';
import type { ContactsViewProps } from './types';
import styles, { AVATAR_WIDTH, DETAILS_HEIGHT } from './styles';

const ContactsView: React.FC<ContactsViewProps> = ({
  data,
  activeAvatarScale,
  activeAvatarHighlightColor,
  onPress,
}) => {
  const [detailsHeight, setDetailsHeight] = React.useState<number>(0);

  const [
    isActive,
    avatarWidthSV,
    detailsHeightSV,
    scrollHandlerForAvatars,
    scrollHandlerForDetails,
    translationX,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    translationY,
    avatarsScrollViewRef,
    detailsScrollViewRef,
  ] = useCoupledScrollViews();

  const animatedShadowOpacityStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isActive.value, { duration: 400 }),
  }));

  React.useEffect(() => {
    avatarWidthSV.value = AVATAR_WIDTH;
  }, [avatarWidthSV]);

  return (
    <View
      testID="contacts-view"
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        setDetailsHeight(height - DETAILS_HEIGHT);
        detailsHeightSV.value = height - DETAILS_HEIGHT;
      }}>
      <View>
        <Animated.View style={[styles.shadowBackground, animatedShadowOpacityStyles]} />
        <Animated.ScrollView
          testID="avatars-scrollview"
          ref={avatarsScrollViewRef}
          style={styles.avatarsFlatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          snapToInterval={AVATAR_WIDTH}
          decelerationRate="fast"
          scrollToOverflowEnabled
          onScroll={scrollHandlerForAvatars}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <AnimatedAvatar
              key={item.id.toString()}
              index={index}
              highlightColor={activeAvatarHighlightColor}
              activeScale={activeAvatarScale}
              animatedScrollOffset={translationX}
              containerScrollViewRef={avatarsScrollViewRef}
              name={`${item.firstName} ${item.lastName}`}
              image={item.profileImageSource}
              onPress={onPress}
            />
          ))}
        </Animated.ScrollView>
      </View>
      <Animated.ScrollView
        testID="details-scrollview"
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
        {data.map((item, index) => (
          <View key={item.id.toString()} testID={`details-container-${index}`} style={{ height: detailsHeight }}>
            <Text style={styles.name}>
              <Text style={styles.firstName}>{item.firstName}</Text>
              {`\xa0${item.lastName}`}
            </Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.heading}>About me</Text>
            <Text style={styles.bio}>{item.bio.split('\n\n')[0]}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ContactsView;
