import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import data from 'mocks/data';
import styles from './styles';
import type { RootStackParamList } from '@screens/types';

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const insets = useSafeAreaInsets();

  const item = data.find(contact => contact.id === route.params.id);
  if (!item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.avatar} source={item.profileImageSource} />
        <Text style={styles.name}>
          <Text style={styles.firstName}>{item.firstName}</Text>
          {`\xa0${item.lastName}`}
        </Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <Text style={styles.heading}>About me</Text>
        <Text style={styles.bio}>{item.bio}</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
