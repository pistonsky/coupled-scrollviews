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
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactsScreen from '@screens/ContactsScreen';
import Colors from 'theme/colors';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  header: {
    borderColor: Colors.border,
    borderBottomWidth: 1,
    backgroundColor: Colors.altBackground,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            headerStyle: styles.header,
            headerTintColor: Colors.text,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
