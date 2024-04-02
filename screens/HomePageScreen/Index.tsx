import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { FC, useEffect, useRef, useState } from "react";
import { HomeProps } from "../../types/NavigationPropsTypes";
import BottomTabNavigator from "../../components/BottomNavBar";
import { base_url, getImages } from "../../services/FetchToApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ImageType {
  url: string;
};

interface photosArray {
  imagenes: ImageType[];
};


const Index: FC<HomeProps> = ({navigation}) => {
    
    const [images, setImages] = useState<ImageType[]| null>(null);
    const isLoading = useRef<boolean>(true);
    
    const logoutFunction = async() => {
      await AsyncStorage.removeItem("userData");
      navigation.replace("Login");
    };

    const CameraFunction = () => {
      navigation.replace("Camera");
    }
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await getImages();

            if (response && response.ok) {
              const data: photosArray = await response.json();
              console.log(data)
              setImages(data.imagenes);
            } else {
              console.error("Failed to fetch images:");
              setImages(null);
            }
          } catch (error) {
            console.error("Error fetching images:", error);
            setImages(null);
            isLoading.current = false;
          } finally {
            isLoading.current = false;
          }
        };
    
        fetchImages();
      }, []);
    console.log("imagenes:",images);
    return(
        <View style={{ flex: 1 }}>
     
      <ScrollView style={{ flex: 1 }}>
        {images && images.length === 0 ? (
          <Text style={styles.emptyText}>No images available</Text>
        ) : images ? (
          images.map((image, index) => (
            <Image key={index} source={{ uri: `${base_url}${image.url}` }} style={styles.image} />
          ))
        ): null}
      </ScrollView>
      <BottomTabNavigator logoutFunction={logoutFunction} CameraFunction={CameraFunction}/>
    </View>
  );
    
};

const styles = StyleSheet.create({
    loadingIndicator: {
      marginTop: 20,
    },
    errorText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'red',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10,
    },
  });

export default Index;
