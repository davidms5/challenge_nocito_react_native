import { FC, useEffect } from "react";
import { LoadingProps } from "../types/NavigationPropsTypes";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen: FC<LoadingProps> = ({navigation}) =>{

    useEffect(() => {

        async function checkUser() {
            const user = await AsyncStorage.getItem("userData");
            if(user === null) {
                navigation.replace("Login");
                return;
            }

            navigation.replace("Home");
        };
        checkUser();

    }, []);

    return (
        <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="blue"/>
        </View>
    )
};

export default LoadingScreen;