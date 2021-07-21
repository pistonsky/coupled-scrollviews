import { StyleSheet } from 'react-native';

const SIZE = 64 * 3 / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    margin: 10,
  },
  avatar: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});

export default styles;
