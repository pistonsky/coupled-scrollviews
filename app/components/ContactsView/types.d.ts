import type { ImageSourcePropType } from 'react-native';
import Animated from 'react-native-reanimated';

export declare type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  profileImageSource: ImageSourcePropType;
};

export declare type Lock = {
  type: number | null;
  timestamp: number | null;
};

export declare type ContactsViewProps = {
  data: Contact[];
  activeAvatarScale: number;
  activeAvatarHighlightColor: string;
};

export declare type AnimatedAvatarProps = {
  index: number;
  highlightColor: string;
  activeScale: number;
  animatedScrollOffset: Animated.SharedValue<number>;
  containerScrollViewRef: React.RefObject<Animated.ScrollView>;
  name: string;
  image: ImageSourcePropType;
};
