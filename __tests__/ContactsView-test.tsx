import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ContactsView from '@components/ContactsView';
import data from 'mocks/data';

test('renders correctly', () => {
  jest.useFakeTimers();
  const tree = renderer.create(<ContactsView data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
