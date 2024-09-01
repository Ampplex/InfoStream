import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import FlashMessage from "react-native-flash-message";
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <FlashMessage position={"bottom"} />
    </NavigationContainer>
    </>
  );
}

export default App;