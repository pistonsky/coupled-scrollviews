import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export declare type RootStackParamList = {
  Contacts: undefined;
  Profile: { id: number };
};

export interface Style {
  container: ViewStyle;
  headerContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  firstName: TextStyle;
  title: TextStyle;
  heading: TextStyle;
  bio: TextStyle;
}
