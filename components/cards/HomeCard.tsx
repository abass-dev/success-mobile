import { View, Pressable, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors"
import { FontAwesome } from '@expo/vector-icons';
import HomeCardItem from "./HomeCardItem"

const HomeCard = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <HomeCardItem
      backgroundImage={require("@/assets/images/card-right-bg.png")}
      iconName="user-circle-o"
      iconColor="red"
      text="Login"
      
      />
    
      <View style={styles.card}>
      <ImageBackground 
      source={require("@/assets/images/card-left-bg.png")}
      imageStyle={{
        opacity:0.9,
        borderRadius:10
      }}
      style={{
        flex:1,
        alignItems: "center",
        resizeMode: "cover",
      }}
      >
        <Pressable
    style={{
      flex:1,
        alignItems: "center",
      
    }}
    android_ripple={{color: '#03325e', borderless: true}}
    onPress={() => router.replace('imageGallery')}
      >
      <Image 
      style={{width: 40, height:40}}
      source={require("@/assets/images/home-chat.png")} 
      />
      <Text style={{marginTop: 20, fontWeight: "bold", color: "#ffffff", fontSize:20}}>Contact Us</Text>
      </Pressable>
      </ImageBackground>
      </View>
      
      <HomeCardItem
      backgroundImage={require("@/assets/images/card-right-bg.png")}
      iconName="info"
      iconColor="white"
      text="About"
      />
      
      <HomeCardItem
       backgroundImage={require("@/assets/images/card-left-bg.png")}
       iconName="camera"
       iconColor="yellow"
       text="Our Gallery"
       goTo="imageGallery"
      />
    </View>
  );
}

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop:27,
  },
  card: {
    justifyContent: "center",
    width: "37%", // Adjust width to ensure two cards fit per line
    height: 150,
    marginVertical: 15,
    borderRadius: 50,
  },
});
