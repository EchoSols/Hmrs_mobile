
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../contexts/AuthContext';
import { commonStyles } from '../styles/commonStyles';
import { setupErrorLogging } from '../utils/errorLogger';

const STORAGE_KEY = 'natively_storage';

export default function RootLayout() {
  useEffect(() => {
    setupErrorLogging();
  }, []);

  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const [emulate] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <SafeAreaView style={commonStyles.wrapper}>
            <StatusBar style="light" backgroundColor="#0f172a" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#ffffff' },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" />
              <Stack.Screen name="signup" />
              <Stack.Screen name="performance" />
              <Stack.Screen name="leave" />
              <Stack.Screen name="tasks" />
            </Stack>
          </SafeAreaView>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
