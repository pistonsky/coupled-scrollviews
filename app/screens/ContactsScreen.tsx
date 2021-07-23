import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ContactsView from '@components/ContactsView';

import data from 'mocks/data';
import styles from './styles';

const ContactsScreen: React.FC<void> = ({}) => {
  const navigation = useNavigation();

  const onPress = React.useCallback(
    (index: number) => {
      navigation.navigate('Profile', { id: data[index].id });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <ContactsView data={data} activeAvatarScale={1.1} activeAvatarHighlightColor="#AAAAFF" onPress={onPress} />
    </View>
  );
};

export default ContactsScreen;
