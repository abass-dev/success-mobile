// LoginScreen.js
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Image, StyleSheet } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { app } from "../../firebaseConfig"; // Import the app instance from firebaseConfig

const auth = getAuth(app);

export default function LoginScreen() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("ChatScreen");
    } catch (error) {
      console.error("Error during sign-in:", error);
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
    <View style={styles.container}>
      {user ? (
        <View style={styles.userContainer}>
          {user.photoURL && (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          )}
          <Text style={styles.userInfo}>
            Welcome back, {user.displayName || "User"}
          </Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <>
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
          <Button title="Login" onPress={handleLogin} />
          <Text
            onPress={() => navigation.push("SignUpScreen")}
            style={styles.toggleText}
          >
            Don't have an account? Sign Up
          </Text>
        </>
      )}
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
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
  },
});
