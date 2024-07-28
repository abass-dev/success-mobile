import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "../../firebaseConfig"; // Correct import
import { ref, onValue, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

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

  if (loading) {
    return <Text>Loading...</Text>;
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
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.uid,
          name: user?.displayName,
          avatar: user?.photoURL, // Optional: if the user's own avatar is already set
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
});
