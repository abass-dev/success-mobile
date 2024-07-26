import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const PAGE_WIDTH = width;
const PAGE_HEIGHT = width * 1.2;
const data = [
  { key: '1', title: 'Slide 1' },
  { key: '2', title: 'Slide 2' },
  { key: '3', title: 'Slide 3' },
  { key: '4', title: 'Slide 3' },
  { key: '5', title: 'Slide 3' },
];

const SCarousel = () => {
  
 // console.log(Carousel.width())
	const baseOptions = {
   // vertical: true,
    width: PAGE_WIDTH / 2,
    height: PAGE_HEIGHT / 2,
    autoplay: 56
  } as const;
  return (
    <View style={styles.container}>
      <Carousel
      mode={Carousel}
      handlerOffset={345}
      {...baseOptions}
      panGestureHandlerProps={{
    activeOffsetX: [-100, 100],
  }}
  size={5600}
      withAnimation={{
          type: "spring",
          config: {
            damping: 10,
          },
        }}
        data={data}
        loop
  autoplay={true}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.slideText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  //  flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  slide: {
    flex: 1,
    justifyContent: 'end',
    alignItems: 'start',
    backgroundColor: '#ccc',
    margin: 3,
    borderWidth: 10,
    borderColor: "#00000010"
  },
  slideText: {
    fontSize: 24,
    color: '#333',
  },
});

export default SCarousel;
