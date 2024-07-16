import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
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
        }}
      />
      <Tabs.Screen
        name="numberToWord"
        options={{
          title: 'Number To Word',
          tabBarIcon: ({ color, focused }) => (
           <FontAwesome name="exchange" size={28} color={color}/> 
          ),
        }}
      />
      <Tabs.Screen
        name="imageGallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, focused }) => (
           <FontAwesome name="camera" size={24} color={color}/> 
          ),
        }}
      />
      
    </Tabs>
  );
}
