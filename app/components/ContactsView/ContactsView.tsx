import * as React from 'react';
import { View, FlatList, Image, ListRenderItem } from 'react-native';

import type { Contact } from './types';

import styles from './styles';

const ContactsView: React.FC<{ data: Contact[] }> = ({ data }) => {
  const renderItem: ListRenderItem<Contact> = ({
    item,
    index,
  }) => {
    return (
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={item.profileImageSource} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList<Contact> style={styles.container} horizontal data={data} renderItem={renderItem} />
    </View>
  );
};

export default ContactsView;
