
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { commonStyles, colors } from '../styles/commonStyles';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();

  console.log('AuthGuard - User:', user ? 'Authenticated' : 'Not authenticated', 'Loading:', isLoading);

  if (isLoading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    console.log('User not authenticated, redirecting to login');
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
