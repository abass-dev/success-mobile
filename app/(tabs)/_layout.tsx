import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { SiConvertio } from "react-icons/si";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
       tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
          
          <Image style={{width:32, height:26}} source={require("@/assets/images/success-logo.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="numberToWord"
        options={{
          title: 'Chiffres en lettres',
          tabBarIcon: ({ color, focused }) => (
           <FontAwesome name="exchange" size={28} color={color}/> 
          ),
        }}
      />
      <Tabs.Screen
        name="imageGallery"
        options={{
          title: 'Affiches',
          tabBarIcon: ({ color, focused }) => (
           <FontAwesome name="photo" size={24} color={color}/> 
          ),
        }}
      />
      <Tabs.Screen
        name="currencyConverter"
        options={{
          title: 'Currency Converter',
          tabBarIcon: ({ color, focused }) => (
           <MaterialIcons name="currency-exchange" size={24} color={color}/> 
          ),
        }}
      />
      
    </Tabs>
  );
}
