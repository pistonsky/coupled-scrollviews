import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { withReanimatedTimer, advanceAnimationByTime } from 'react-native-reanimated/lib/reanimated2/jestUtils';

import ContactsView from '@components/ContactsView';
import { AVATAR_WIDTH } from '@components/ContactsView/styles';
import data from 'mocks/data';

describe('Avatar animations', () => {
  const activeAvatarHighlightColor = '#AAAAFF';
  const activeAvatarScale = 1.1;
  const activeStyle = {
    backgroundColor: activeAvatarHighlightColor + 'ff',
    transform: [{ scale: activeAvatarScale }],
  };

  it('highlights centered profile avatar when user scrolls avatars', () => {
    withReanimatedTimer(() => {
      const { getByTestId, getByLabelText } = render(
        <ContactsView
          data={data}
          activeAvatarScale={activeAvatarScale}
          activeAvatarHighlightColor={activeAvatarHighlightColor}
        />,
      );
      const avatarsScrollView = getByTestId('avatars-scrollview');
      const secondAvatarContainer = getByLabelText(`${data[1].firstName} ${data[1].lastName}`);

      fireEvent.scroll(avatarsScrollView, {
        nativeEvent: { contentOffset: { x: AVATAR_WIDTH } },
      });
      advanceAnimationByTime(100);
      expect(secondAvatarContainer).toHaveAnimatedStyle(activeStyle);
    });
  });
});
