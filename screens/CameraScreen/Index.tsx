import React, { useState, useRef, FC } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CameraProps } from '../../types/NavigationPropsTypes';
import { PostImage } from '../../services/FetchToApi';
import { ShowToast } from '../../utils/ShowAlerts';


const Index: FC<CameraProps> = ({navigation}) => {
    
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<RNCamera | null>(null);

    const takePhoto = async () => {
        if (cameraRef.current) {
          const options = { quality: 0.2, base64: true };
          const data = await cameraRef.current.takePictureAsync(options);
          setPhotoUri(data.uri);
        }
      };
    
    const sendPhoto = async () => {

      if(!photoUri) return;

      const successUpload = await PostImage(photoUri);

      if(successUpload){
        ShowToast("success", "la imagen fue subida con exito", "");
        navigation.replace("Home");
        return;
      };

      ShowToast("info", "hubo un problema en subir la imagen", "intente nuevamente");
      return;

    };

    const goToHome = () => {
      navigation.replace("Home");
      return;
    }

    const retakePhoto = () => {
      setPhotoUri(null);
      return;
    };

    if(photoUri) {
      return (
        <View style={styles.container}>
      {/* Image */}
      <Image source={{ uri: photoUri }} style={styles.image} />

      {/* Retake Photo Button */}
      <TouchableOpacity onPress={retakePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Tomar otra foto</Text>
      </TouchableOpacity>

      {/* Send Photo Button */}
      <Button title="Enviar foto" onPress={sendPhoto} />

    </View>
      );
    };
      return (
        <View style={styles.container}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
          />
          <Button title="tomar foto" onPress={takePhoto} />
          <Button title="volver" onPress={goToHome}/>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      flex: 1,
      width: '100%',
    },
    image: {
      marginTop: 20,
      width: "90%",
      height: "80%",
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 17,
      borderRadius: 5,
      marginBottom: 5, // Add some margin below the button
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  
export default Index;