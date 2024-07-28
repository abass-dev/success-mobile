import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { app } from "../../firebaseConfig"; // Import the app instance from firebaseConfig
import { Header, Icon } from "react-native-elements";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const auth = getAuth(app);

export default function LoginScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribeAuth;
  }, []);

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!password) {
      errors.password = "Password is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("ChatScreen");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        firebase: "Invalid email or password.",
      }));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reset the user state after logging out
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Header
        leftComponent={
          <Icon
            name="arrow-back"
            color="#fff"
            onPress={() => navigation.replace("/")}
          />
        }
        rightComponent={
          <Image
            source={require("@/assets/images/success-logo.png")} // Replace with your app logo path
            style={styles.logo}
          />
        }
        containerStyle={styles.header}
      />
      <StatusBar style="light" backgroundColor={Colors.dark.background} />
      <View style={styles.container}>
        {user ? (
          <View style={styles.userContainer}>
            {user.photoURL && (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            )}
            <Text style={styles.userInfo}>
              Welcome back, {user.displayName || "User"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Login to Success</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
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
            {errors.firebase && (
              <Text style={styles.errorText}>{errors.firebase}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text
              onPress={() => navigation.push("SignUpScreen")}
              style={styles.toggleText}
            >
              Don't have an account? Sign Up
            </Text>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: Colors.dark.background,
    justifyContent: "space-around",
    borderBottomWidth: 0,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
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
    marginBottom: 12,
    marginTop: -12,
    marginLeft: 5,
    fontSize: 12,
  },
  button: {
    backgroundColor: Colors.dark.background,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  userContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 16,
    color: "#333",
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    color: "#3D6DCC",
    fontSize: 16,
  },
});
