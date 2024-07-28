// AuthScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, Image, StyleSheet } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "expo-router";
import { app } from "../../firebaseConfig"; // Import the app instance from firebaseConfig

const auth = getAuth(app);
const storage = getStorage(app);

export default function AuthScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [image, setImage] = useState(null);

  const handleAuth = async () => {
    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (image) {
          console.log("Starting image upload...");

          const response = await fetch(image);
          const blob = await response.blob();
          const storageRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(storageRef, blob);

          const photoURL = await getDownloadURL(storageRef);
          console.log("Image uploaded. Photo URL:", photoURL);

          await updateProfile(user, { photoURL });
          console.log("Profile updated with photo URL.");
        }

        navigation.replace("ChatScreen");
      } catch (error) {
        console.error("Error during sign-up:", error);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.replace("ChatScreen");
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Correctly use 'uri' property from result
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isSignUp && (
        <View>
          <Button title="Pick an image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
      )}
      <Button title={isSignUp ? "Sign Up" : "Login"} onPress={handleAuth} />
      <Text onPress={() => setIsSignUp(!isSignUp)} style={styles.toggleText}>
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
    alignSelf: "center",
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
  },
});
