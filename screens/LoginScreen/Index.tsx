import { FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LoginProps } from "../../types/NavigationPropsTypes";
import LoginForm from "../../components/FormLoginComponent";
import { FetchUserLoginTypes } from "../../types/FetchUserTypes";
import { POSTUserData } from "../../services/FetchToApi";
import { ShowToast } from "../../utils/ShowAlerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index: FC<LoginProps> = ({navigation}) => {

    const handleLogin = async (values: FetchUserLoginTypes) => {
        const apiResponse: FetchUserLoginTypes = await POSTUserData("/usuarios/signin", values);
        if(apiResponse.message){
            ShowToast("info", apiResponse.message, "vuelva a intentarlo");
            return;
        };
        await AsyncStorage.setItem("userData", JSON.stringify(apiResponse));
        navigation.replace("Home");

    }

    return(
        <>
        <View style={styles.container}>
            <Text style={styles.title}>login</Text>
            <LoginForm onSubmit={handleLogin}/>
           
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.replace("SignUp")}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 26,
      color: "#007bff",
      marginBottom: 20,
    },
    registerText: {
      fontSize: 16,
      marginBottom: 10,
      color: "black"
    },
    signupButton: {
      backgroundColor: "#007bff",
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginBottom: 10
    },
    signupButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default Index;