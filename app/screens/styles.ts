import { StyleSheet } from 'react-native';

import type { Style } from './types';
import a from 'utils/a';

const MARGIN_HORIZONTAL = a(16, 20);
const IMAGE_SIZE = a(64, 96) * 1.5;

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    backgroundColor: '#AAAAFF40',
    alignItems: 'center',
  },
  avatar: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  name: {
    fontSize: a(20, 24),
    fontWeight: '300',
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  firstName: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: a(13, 17),
    fontWeight: '300',
    color: '#555',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 6,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  heading: {
    fontSize: a(13, 17),
    fontWeight: 'bold',
    color: '#000',
    marginTop: 24,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  bio: {
    fontSize: a(13, 17),
    fontWeight: '300',
    color: '#555',
    marginTop: 8,
    marginHorizontal: MARGIN_HORIZONTAL,
  },
});

export default styles;
