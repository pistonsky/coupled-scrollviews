import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import ContactsView from '@components/ContactsView';

import data from 'mocks/data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ContactsScreen: React.FC<void> = ({}) => {
  return (
    <View style={styles.container}>
      <ContactsView
        data={data}
        activeAvatarScale={1.1}
        activeAvatarHighlightColor="#AAAAFF"
      />
    </View>
  );
};

export default ContactsScreen;
