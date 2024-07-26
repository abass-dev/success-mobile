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
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius:5,
  },
});

export default SGallery;
