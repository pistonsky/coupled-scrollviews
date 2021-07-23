/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import ContactsScreen from '@screens/ContactsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import Colors from 'theme/colors';
import type { RootStackParamList } from '@screens/types';

const styles = StyleSheet.create({
  header: {
    borderColor: Colors.border,
    borderBottomWidth: 1,
    backgroundColor: Colors.altBackground,
  },
});

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            headerStyle: styles.header,
            headerTintColor: Colors.text,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              Platform.OS === 'ios'
                ? CardStyleInterpolators.forModalPresentationIOS
                : CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
