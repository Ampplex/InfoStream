import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import FlashMessage from "react-native-flash-message";
import Register from './screens/Register';
import Route from './router/Route';
import Data_State from './context/Data/Data_State';
import WebViewScreen from './screens/WebViewScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
    <Data_State>
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
        <Stack.Screen 
          name="Route" 
          component={Route} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="WebViewScreen" 
          component={WebViewScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <FlashMessage position={"bottom"} />
    </NavigationContainer>
    </Data_State>
    </>
  );
}

export default App;