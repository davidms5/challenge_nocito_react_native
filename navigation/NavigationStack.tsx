import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePageScreen from '../screens/HomePageScreen/Index';
import LoginScreen from '../screens/LoginScreen/Index';
import SignUpScreen from "../screens/SignUpScreen/Index" 
import LoadingScreen from '../screens/LoadingScreen';
import CameraScreen from "../screens/CameraScreen/Index";

const Stack = createNativeStackNavigator();



export default function MyStack() {

  return (
    <Stack.Navigator initialRouteName='Loading'>

      <Stack.Screen name="Home" component={HomePageScreen} />
      <Stack.Screen name='Loading' component={LoadingScreen}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{title: "Nocito Login"}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name='Camera' component={CameraScreen}/>
    </Stack.Navigator>
  );
}


