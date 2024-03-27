import { FetchUserLoginTypes, FetchUserSignUpTypes } from "../types/FetchUserTypes";
import { ShowToast } from "../utils/ShowAlerts";

const base_url = "https://kw9mphbz-8080.brs.devtunnels.ms";


export async function POSTUserData(url: string, userData: FetchUserSignUpTypes | FetchUserLoginTypes) {

    try {
        const oldUser = await checkUser(userData.email);
        if(oldUser && url === "/usuarios/signup") {
            ShowToast("error", "el correo ya esta registrado", "por favor, ingrese otro correo");
            return;
        };
        const response = await fetch(`${base_url}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        console.log(error);
        ShowToast("error", "algo salio mal!", "por favor, intente mas tarde");
        return;
    };
    
};

async function checkUser (userEmail: string) {
    const response = await fetch(`${base_url}/usuarios`);
    const responseData: FetchUserSignUpTypes[] = await response.json();
    return responseData.some(obj => obj.email === userEmail);
};

export async function PostImage(uri: string) {

    try {
        const formData = new FormData();
        formData.append('imagen', {
            uri,
            type: 'image/jpeg',
        });

        const response = await fetch(`${base_url}/usuarios/upload`, {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });

        if (response.ok) {
            console.log('Photo uploaded successfully!');
            return true;
        } else {
            console.error('Failed to upload photo');
            return false;
        }
    } catch (error) {
        console.log(error);
        ShowToast("error", "algo salio mal!", "por favor, intente mas tarde");
        return;
    };
    
};

export async function getImages()  {

    try {
        const response = await fetch(`${base_url}/imagenes`);
        
        return response;
        
    } catch (error) {
        console.log(error);
        ShowToast("error", "algo salio mal!", "por favor, intente mas tarde");
        return;
    };
}