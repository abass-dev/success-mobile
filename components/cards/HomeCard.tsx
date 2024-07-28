import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import HomeCardItem from "./HomeCardItem";
import { Entypo } from "@expo/vector-icons";

const HomeCard = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <HomeCardItem
        backgroundImage={require("@/assets/images/card-right-bg.png")}
        Icon={<FontAwesome name="user-circle-o" size={40} color="white" />}
        text="Login"
        goTo="LoginScreen"
      />

      <HomeCardItem
        backgroundImage={require("@/assets/images/card-left-bg.png")}
        Icon={<Entypo name="chat" size={40} color="white" />}
        text="Chat"
        goTo="ChatScreen"
      />

      <HomeCardItem
        backgroundImage={require("@/assets/images/card-right-bg.png")}
        Icon={<FontAwesome name="info" size={40} color="white" />}
        text="About"
      />

      <HomeCardItem
        backgroundImage={require("@/assets/images/card-left-bg.png")}
        Icon={<FontAwesome name="camera" size={35} color="white" />}
        text="Our Gallery"
        goTo="imageGallery"
      />
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 27,
  },
  card: {
    justifyContent: "center",
    width: "37%", // Adjust width to ensure two cards fit per line
    height: 150,
    marginVertical: 15,
  },
});
