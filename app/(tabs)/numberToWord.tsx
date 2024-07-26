import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import { Fr as ConverFr } from '@/components/number-to-word/Fr';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {Colors} from '@/constants/Colors'
import { SiConvertio } from "react-icons/si";

export default function NumberToWord() {
	    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    
    const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(result);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  
const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const handleConvert = () => {
        const num = parseInt(number, 10);
        if (!isNaN(num)) {
            setResult(capitalizeFirstLetter(ConverFr(num)));
        } else {
            setResult('Veuillez entrer un nombre valide.');
        }
    };

  return (
    <ParallaxScrollView
      headerHeigth={10}
      headerBackgroundColor={{ light: Colors.successPrimary.background, dark: '#353636' }}
      headerImage={
      <>
      	
      <FontAwesome size={200} name="exchange" style={styles.headerImage} />
      <FontAwesome size={400} name="exchange" style={{position: "absolute",
      color: "#ffffff10", top: -10}} />
      </>
      	
      }>
    
            <ThemedView>
            	
            <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" >Chiffres en lettres</ThemedText>
            <ThemedText>Par Success Com Niger</ThemedText>
            </ThemedView>
            	
            <ThemedView style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Entrez un nombre"
                value={number}
                onChangeText={setNumber}
            />
            <TouchableOpacity>
            <FontAwesome style={styles.convertBtn} size={24} name="exchange" onPress={handleConvert} />
            </TouchableOpacity>
            </ThemedView>
            {result ? 
            <ThemedView style={styles.resultContainer}>
            <ThemedText style={styles.result}>{result}</ThemedText> 
           	<Ionicons color="#03325e" size={24} name="copy-outline" onPress={copyToClipboard} />
            </ThemedView>
            : null}
        </ThemedView>
        
     </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#ffffff',
    top: 20,
    position: 'absolute',
  },
  titleContainer: {
    flex:1,
    alignItems: "center",
    marginBottom:40
  },
  inputContainer: {
  	flex: 1,
  	gap:8,
  	flexDirection: "row",
  	alignItems: "center",
  },
  convertBtn: {
  	color: "#03325e"
  },
  resultContainer: {
  	flex: 1,
  	flexDirection: "row",
  	borderWidth: 1,
  	borderColor: "#03325e10",
  	marginTop: 20,
  	padding: 5,
  },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
    	flex:1,
        height: 40,
        borderColor: '#03325e',
        borderWidth: 1,
        paddingHorizontal: 10,
        
    },
    result: {
      	flex: 2,
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
