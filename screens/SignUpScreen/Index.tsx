import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SignUpProps } from "../../types/NavigationPropsTypes";
import { FetchUserSignUpTypes } from "../../types/FetchUserTypes";
import SignUpForm from "../../components/FormSignUpComponent";
import { POSTUserData } from "../../services/FetchToApi";
import { ShowToast } from "../../utils/ShowAlerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index: FC<SignUpProps> = ({navigation}) => {

    const handleSignUp = (values: FetchUserSignUpTypes) => {
        
        const postSignUpForm = async(values: FetchUserSignUpTypes) => {

            const apiResponse = await POSTUserData("/usuarios/signup", values);
            if(apiResponse.error) {
                ShowToast("error", apiResponse.error, "");
                return;
            };
            await AsyncStorage.setItem("userData", JSON.stringify(apiResponse));
            
            console.log(apiResponse);
            navigation.replace("Home");
        };
        
        postSignUpForm(values);
    };

    return(
        <>
        <View style={styles.container}>
            <Text style={styles.title}>sign up</Text>
            <SignUpForm onSubmit={handleSignUp}/>
            <Text>ya tiene una cuenta?</Text>
            <Button title="Login" onPress={() => navigation.replace("Login")}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

export default Index;
