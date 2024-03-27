import Toast from "react-native-toast-message";

export function ShowToast(type: string, text1: string, text2: string){

    Toast.show({
          type,
          position: "bottom",
          text1,
          text2
        });
}