import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../types/NavigationPropsTypes';
import Icon from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type LogoutFunctionType = () => void;
type CameraFunctionTypes =  () => void;


const BottomTabNavigator: React.FC<{ logoutFunction: LogoutFunctionType, CameraFunction: CameraFunctionTypes }> = ({logoutFunction, CameraFunction}) => {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="TakePhoto" component={()=> null} options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={CameraFunction}>
            <Icon name="camera" color={color} size={size} /> 
            </TouchableOpacity>
          ),
        }}/>
      <Tab.Screen name="Logout" component={() => null} options={{
        tabBarIcon: ({color, size}) => (
          <TouchableOpacity onPress={logoutFunction}>
          <Icon name="log-out" color={color} size={size}/>
          </TouchableOpacity>
        ),
        
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
