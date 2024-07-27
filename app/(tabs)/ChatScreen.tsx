// ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../../firebaseConfig'; // Correct import
import { ref, onValue, push } from 'firebase/database';
import { useRouter } from 'expo-router';
import { View, Text} from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useRouter()
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        navigation.replace('AuthScreen');
      }
    });

    return unsubscribeAuth;
  }, [auth]);

  useEffect(() => {
    if (user) {
      const messagesRef = ref(database, 'messages');
      const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val() || {};
        const formattedMessages = Object.keys(data).map((key) => ({
          _id: key,
          text: data[key].text,
          createdAt: new Date(data[key].createdAt),
          user: {
            _id: data[key].userId,
            name: data[key].userName,
          },
        }));
        setMessages(formattedMessages.reverse());
      });
      return () => unsubscribeMessages();
    }
  }, [user]);

  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      text: message.text,
      createdAt: message.createdAt.getTime(),
      userId: user.uid,
      userName: user.displayName,
    });
  }, [user]);

  return (
    <GiftedChat
      isTyping={true}
      renderMessageImage={() => <View><Text>Hi</Text></View>}
      messages={messages}
      bottomOffset={-50}
      scrollToBottom
      renderUsernameOnMessage
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.uid,
        name: user?.displayName,
      }}
    />
  );
}
