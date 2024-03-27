import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../types/NavigationPropsTypes';


const Tab = createBottomTabNavigator();
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;


const TakePhotoScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          <IconButton icon="camera" onPress={() => navigation.replace("Camera")} />
        </View>
      );
}

const LogoutScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = () => {
    
    navigation.replace('Login'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IconButton icon="logout" onPress={handleLogout} />
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TakePhoto" component={TakePhotoScreen} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
