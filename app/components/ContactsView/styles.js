import { StyleSheet, Dimensions, Platform } from 'react-native';

import a from 'utils/a';

const MARGIN_HORIZONTAL = a(16, 20);
const MARGIN_VERTICAL = a(20, 20);
const BORDER_WIDTH = 4;
const IMAGE_SIZE = a(64, 96);
export const SIZE = IMAGE_SIZE + MARGIN_HORIZONTAL;
export const HEIGHT = IMAGE_SIZE + BORDER_WIDTH * 2 + MARGIN_VERTICAL * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  avatarsFlatListContainer: {
    flex: 0,
    height: HEIGHT,
  },
  contentContainerStyle: {
    paddingHorizontal:
      (Dimensions.get('window').width - (IMAGE_SIZE + MARGIN_HORIZONTAL)) / 2,
    paddingVertical: 0,
    alignItems: 'center',
  },
  avatarContainer: {
    marginHorizontal: MARGIN_HORIZONTAL / 2 - BORDER_WIDTH,
    marginVertical: MARGIN_VERTICAL,
    width: IMAGE_SIZE + BORDER_WIDTH * 2,
    height: IMAGE_SIZE + BORDER_WIDTH * 2,
    borderRadius: (IMAGE_SIZE + BORDER_WIDTH * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  shadowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0.11, 0.2, 0.38, 0.12)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
    }),
  },
});

export default styles;
