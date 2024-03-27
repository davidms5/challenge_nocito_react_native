import React, { useState, useRef, FC } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
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
        ShowToast("sucess", "la imagen fue subida con exito", "");
        navigation.replace("Home");
        return;
      };

      ShowToast("info", "hubo un problema en subir la imagen", "intente nuevamente");
      return;

    }
      return (
        <View style={styles.container}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
          />
          <Button title="tomar foto" onPress={takePhoto} />
          <Button title="enviar foto" onPress={sendPhoto}/>
          {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
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
      width: 200,
      height: 200,
    },
  });
  
export default Index;