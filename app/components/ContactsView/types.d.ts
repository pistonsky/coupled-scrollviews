import type { ImageSourcePropType } from 'react-native';

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
