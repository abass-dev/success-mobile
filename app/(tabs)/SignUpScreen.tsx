import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "expo-router";
import { app } from "../../firebaseConfig"; // Import the app instance from firebaseConfig
import { FontAwesome } from "@expo/vector-icons";

const auth = getAuth(app);
const storage = getStorage(app);

export default function SignUpScreen() {
  const navigation = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anniversary, setAnniversary] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!fullName || fullName.length < 4) {
      errors.fullName = "Full name must be at least 4 characters.";
      valid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    if (!anniversary) {
      errors.anniversary = "Please select a valid anniversary date.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let photoURL = null;

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, blob);

        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL,
      });

      navigation.replace("ChatScreen");
    } catch (error) {
      console.error("Error during sign-up:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrors({
          ...errors,
          email: "Email already has an account. Please log in.",
        });
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Success Account</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <View style={styles.imageContainer}>
          <Image
            source={
              image
                ? { uri: image }
                : require("@/assets/images/default-profile.png") // Use your default profile picture icon
            }
            style={styles.image}
          />
          <View style={styles.editIconContainer}>
            <FontAwesome
              name="edit"
              size={20}
              color={"white"}
              style={styles.editIcon}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.input,
              styles.dateInput,
              errors.anniversary && styles.inputError,
            ]}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>
              {anniversary.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {errors.anniversary && (
            <Text style={styles.errorText}>{errors.anniversary}</Text>
          )}
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          value={anniversary}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || anniversary;
            setShowPicker(false);
            setAnniversary(currentDate);
          }}
        />
      )}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    color: "#333",
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#00000060",
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    padding: 5,
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
