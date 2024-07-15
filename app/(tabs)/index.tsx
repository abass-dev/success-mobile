import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (result.uri) {
        const fileUri = result.uri;
        const fileName = result.name || 'audio.mp3'; // Default name if not provided
        const fileType = 'audio/mpeg'; // MIME type for MP3 files

        console.log('File URI:', fileUri);
        console.log('File Name:', fileName);

        // Example: Upload the selected file to your server
        // Replace 'http://your-server-ip:5000/convert' with your actual server endpoint
        const formData = new FormData();
        formData.append('file', {
          uri: fileUri,
          name: fileName,
          type: fileType,
        });

        try {
          let response = await fetch('http://localhost:5001/convert', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          let jsonResponse = await response.json();
          console.log('Server Response:', jsonResponse); // Log response from the server
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('Document picking cancelled or failed');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Audio File" onPress={pickDocument} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
