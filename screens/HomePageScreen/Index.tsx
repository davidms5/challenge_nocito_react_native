import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FC, useEffect, useRef, useState } from "react";
import { HomeProps } from "../../types/NavigationPropsTypes";
import BottomTabNavigator from "../../components/BottomNavBar";
import { getImages } from "../../services/FetchToApi";
import { ActivityIndicator } from "react-native-paper";

const Index: FC<HomeProps> = ({navigation}) => {
    
    const [images, setImages] = useState<string[]>([]);
    const isLoading = useRef<boolean>(true);
    

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await getImages();

            if (response && response.ok) {
              const data: string[] = await response.json();
              setImages(data);
            } else {
              console.error("Failed to fetch images:");
              setImages([]);
            }
          } catch (error) {
            console.error("Error fetching images:", error);
            setImages([]);
            isLoading.current = false;
          } finally {
            isLoading.current = false;
          }
        };
    
        fetchImages();
      }, []);
    
    return(
        <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: "black" }}>Home Page</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {isLoading.current ? (
          <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
        ) : images.length === 0 ? (
          <Text style={styles.emptyText}>No images available</Text>
        ) : (
          images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))
        )}
      </ScrollView>
      <BottomTabNavigator />
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
