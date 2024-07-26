import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import CircularMenu from "@/components/CircularMenu"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
//setTimeout(SplashScreen.hideAsync, 900000);
enableScreens();

export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
  	<>
  		
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar backgroundColor={colorScheme === "dark" ?
      Colors.dark.background : Colors.dark.background} style={colorScheme ===
      "dark" ? "light" : "light"}/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <CircularMenu />
    </ThemeProvider>
  	</>
  );
}
