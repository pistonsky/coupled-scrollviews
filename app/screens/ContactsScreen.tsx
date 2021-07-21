import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ContactsScreen: React.FC<void> = ({}) => {
  return <View style={styles.container} />;
};

export default ContactsScreen;
