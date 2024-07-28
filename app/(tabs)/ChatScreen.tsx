import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { database, firestore } from "../../firebaseConfig"; // Correct import
import { ref, onValue, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Button, Header, Icon } from "react-native-elements";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useRouter();
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    if (user) {
      const messagesRef = ref(database, "messages");
      const unsubscribeMessages = onValue(messagesRef, async (snapshot) => {
        const data = snapshot.val() || {};
        const formattedMessages = await Promise.all(
          Object.keys(data).map(async (key) => {
            const avatarURL = await getAvatarURL(data[key].userId);
            return {
              _id: key,
              text: data[key].text,
              createdAt: new Date(data[key].createdAt),
              user: {
                _id: data[key].userId,
                name: data[key].userName,
                avatar: avatarURL,
              },
            };
          })
        );
        setMessages(formattedMessages.reverse());
      });
      return () => unsubscribeMessages();
    }
  }, [user]);

  const onSend = useCallback(
    async (messages = []) => {
      const message = messages[0];
      const avatarURL = await getAvatarURL(user.uid);
      const messagesRef = ref(database, "messages");
      push(messagesRef, {
        text: message.text,
        createdAt: message.createdAt.getTime(),
        userId: user.uid,
        userName: user.displayName,
        userAvatar: avatarURL,
      });
    },
    [user]
  );

  const getAvatarURL = async (userId) => {
    try {
      const avatarRef = storageRef(storage, `avatars/${userId}`);
      const avatarURL = await getDownloadURL(avatarRef);
      return avatarURL;
    } catch (error) {
      console.error("Error fetching avatar URL:", error);
      return null;
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          You must be logged in to use the chat.
        </Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.replace("LoginScreen")}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={Colors.dark.background} />
      <Header
        leftComponent={
          <Icon
            name="logout"
            type="material"
            color="#fff"
            onPress={handleLogout}
          />
        }
        centerComponent={{
          text: "Success Chat",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={
          user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : null
        }
        containerStyle={styles.headerContainer}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.uid,
          name: user?.displayName,
          avatar: user?.photoURL,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  headerContainer: {
    backgroundColor: Colors.dark.background,
    justifyContent: "space-around",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
