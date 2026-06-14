import { AppProvider } from '@/context/AppProvider';
import { Stack } from 'expo-router';
import {
  useFonts,
  LondrinaOutline_400Regular,
} from "@expo-google-fonts/londrina-outline";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    LondrinaOutline_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops! Not Found' }} />
      </Stack>
    </AppProvider>
  );
}

