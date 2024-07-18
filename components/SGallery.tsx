import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from "./ParallaxScrollView"
import { Colors } from "@/constants/Colors"
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Logo from "@/assets/images/success-logo.svg"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
    <Path
      fill="#09f"
      d="m0 96 48-5.3C96 85 192 75 288 74.7c96 .3 192 10.3 288 16 96 5.3 192 5.3 288 26.6 96 21.7 192 63.7 288 48 96-16.3 192-90.3 240-128L1440 0v320H0Z"
    />
  </Svg>
)


const SGallery = () => {
  const images = [
    {name: "Home", uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4" },
    {name: "Test", uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34" },
    {name: "Toto", uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111" },
  ];

  const [visible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index) => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImage(index)}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
  	<>
  	<ParallaxScrollView
      headerBackgroundColor={{ light: Colors.successPrimary.background, dark: '#353636' }}
      headerImage={
      <>
      <FontAwesome size={200} name="photo" style={styles.headerImage} />
      <FontAwesome size={300} name="photo" style={{position: "absolute",
      color: "#ffffff10", top: 10}} />
  		
      </>
      	
      }>
      <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title} type="title" >Nos Affiches</ThemedText>
            <ThemedText>Par Success Com Niger</ThemedText>
            </ThemedView>
            
      </ParallaxScrollView>
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
      <ImageView
        FooterComponent={(imageIndex) => {
        return	(<View>
        		<Text style={{color: "#fff"}}>{images[imageIndex.imageIndex].name}</Text>
        	</View>)
        }}
        images={images}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
	  titleContainer: {
    flex:1,
    alignItems: "center",
  },
    title: {
    	color: Colors.successPrimary.text
    },
	 headerImage: {
    color: '#ffffff',
    top: 40,
    left:5,
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius:5,
  },
});

export default SGallery;
