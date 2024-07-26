import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import SGallery from "@/components/SGallery"
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CurrencyConverter from "@/components/CurrencyConverter"
import { Colors} from "@/constants/Colors"
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
  	  <ParallaxScrollView
       headerBackgroundColor={{ light: Colors.successPrimary.background, dark: '#353636' }}
      headerImage={
      <>
      	
      <MaterialIcons size={200} name="currency-exchange" style={styles.headerImage} />
      <MaterialIcons size={400} name="currency-exchange" style={{position: "absolute",
      color: "#ffffff05", top: -10}} />
      </>
      	
      }>
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" >Currency Converter</ThemedText>
      <ThemedText>Par Success Com Niger</ThemedText>
      </ThemedView>
  	<CurrencyConverter />
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
  },
    title: {
    	color: Colors.successPrimary.text
    },
 
});
