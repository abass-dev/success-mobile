// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { convertNumberToWords } from '../../components/Convert';
import HomePage from '../../components/HomePage';

export default function App() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');

    const handleConvert = () => {
        const num = parseInt(number, 10);
        if (!isNaN(num)) {
            setResult(convertNumberToWords(num));
        } else {
            setResult('Veuillez entrer un nombre valide.');
        }
    };

    return (
       <>
       	
       
       	<HomePage />
       {/** <View style={styles.container}>
            <Text style={styles.title}>Convertir Chiffres en Lettres</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Entrez un nombre"
                value={number}
                onChangeText={setNumber}
            />
            <Button title="Convertir" onPress={handleConvert} />
            {result ? <Text style={styles.result}>{result}</Text> : null}
        </View>
        */
        }
        </>
    );
}

const styles = StyleSheet.create({
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
