import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Loading: undefined;
    Camera: undefined;
};
export interface HomeProps  {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">
};
export interface CameraProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "Camera">
};
export interface LoginProps  {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">
};

export interface SignUpProps  {
    navigation: NativeStackNavigationProp<RootStackParamList, "SignUp">
};

export interface LoadingProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "Loading">
};