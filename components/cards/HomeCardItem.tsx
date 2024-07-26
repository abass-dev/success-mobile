import { View, Pressable, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors"
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";


const HomeCardItem = ({backgroundImage, Icon, iconName, iconColor, text, goTo}: any) => {
  const router = useRouter()
 return (
   <View 
      style={styles.card}
   >
    
      <ImageBackground 
      source={backgroundImage}
      imageStyle={{
        opacity:0.9,
        borderRadius:10,
      }}
      style={{
        flex:1,
      }}
      >
    <Pressable
    style={{
      flex:1,
        alignItems: "center",
      
    }}
    android_ripple={{color: '#03325e', borderless: true}}
    onPress={() => router.replace(goTo ? goTo : "/")}
      >
        {Icon}
      
      <Text style={{marginTop: 20, fontWeight: "bold", color: "#ffffff", fontSize:20}}>{text}</Text>
      </Pressable>
      </ImageBackground>
      </View>
    )
}

export default HomeCardItem

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
  },
});
