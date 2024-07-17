import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

const CurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('FCFA');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, FCFA: 600 });
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
         // throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExchangeRates({ USD: data.rates.USD, FCFA: data.rates.XAF }); // Assuming the API provides the rate for XAF (FCFA)
      } catch (error) {
        console.log('Error fetching exchange rates:', error);
        // Fallback to default exchange rates if fetch fails
        setExchangeRates({ USD: 1, FCFA: 600 });
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvert = () => {
    const amountNumber = parseFloat(amount);
    if (!isNaN(amountNumber)) {
      if (selectedCurrency === 'FCFA') {
        setConvertedAmount((amountNumber / exchangeRates.FCFA).toFixed(2));
      } else {
        setConvertedAmount((amountNumber * exchangeRates.FCFA).toFixed(2));
      }
    } else {
      setConvertedAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        style={{backgroundColor: "#00000010"}}
        selectionColor="#03325e"
        mode="dropdown"
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        <Picker.Item label="FCFA" value="FCFA" />
        <Picker.Item label="USD" value="USD" />
      </Picker>
      <Text>Exchange rate: 1 USD = {exchangeRates.FCFA} FCFA</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Convert" onPress={handleConvert} />
      <Text>
        Converted amount: {convertedAmount} {selectedCurrency === 'FCFA' ? 'USD' : 'FCFA'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  input: {
    height: 40,
    borderColor: '#03325e',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});


export default CurrencyConverter;
