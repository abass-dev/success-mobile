import Ionicons from '@expo/vector-icons/Ionicons';
import { FaCopy } from "react-icons/fa";
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { convertNumberToWords } from '../../components/Convert';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';

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
            setResult(capitalizeFirstLetter(convertNumberToWords(num)));
        } else {
            setResult('Veuillez entrer un nombre valide.');
        }
    };

  return (
    <ParallaxScrollView
      headerHeigth={10}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
      <FontAwesome size={350} name="exchange" style={styles.headerImage} />}>
    
            <View style={styles.container}>
            <Text style={styles.title}>Convertir Chiffres en
            Lettres</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Entrez un nombre"
                value={number}
                onChangeText={setNumber}
            />
            <Button title="Convertir" onPress={handleConvert} />
            {result ? 
            <>
            	<FaCopy  onPress={copyToClipboard} />
  
            <Text style={styles.result}>{result}</Text> 
            </>
            : null}
        </View>
        
     </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
