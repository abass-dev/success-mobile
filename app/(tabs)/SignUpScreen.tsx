import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "expo-router";
import { app } from "../../firebaseConfig"; // Import the app instance from firebaseConfig

const auth = getAuth(app);
const storage = getStorage(app);

export default function SignUpScreen() {
  const navigation = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let photoURL = null;

      if (image) {
        console.log("Starting image upload...");

        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, blob);

        photoURL = await getDownloadURL(storageRef);
        console.log("Image uploaded. Photo URL:", photoURL);
      }

      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL,
      });
      console.log("Profile updated with full name and photo URL.");

      navigation.replace("ChatScreen");
    } catch (error) {
      console.error("Error during sign-up:", error);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
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
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Select profile picture</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.replace("LoginScreen")}
        style={styles.toggleText}
      >
        Already have an account? Login
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  imagePicker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imagePickerText: {
    color: "#007bff",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
    alignSelf: "center",
  },
  signUpButton: {
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    color: "#007bff",
    fontSize: 16,
  },
});
