
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  console.log('Login screen loaded');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    console.log('Attempting login...');

    try {
      const success = await login(email, password);
      if (success) {
        console.log('Login successful, redirecting to dashboard');
        router.replace('/');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={commonStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[commonStyles.header, { paddingTop: 60, paddingBottom: 40 }]}
      >
        <View style={commonStyles.center}>
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 30,
            padding: 20,
            marginBottom: 20,
          }}>
            <Ionicons name="business-outline" size={40} color={colors.text} />
          </View>
          <Text style={[commonStyles.title, { textAlign: 'center' }]}>Welcome Back</Text>
          <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>
            Sign in to your HR Management account
          </Text>
        </View>
      </LinearGradient>

      <View style={[commonStyles.content, { paddingTop: 40 }]}>
        {/* Email Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.text, { marginBottom: 8, fontSize: 14, fontWeight: '600' }]}>
            Email Address
          </Text>
          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
            <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <TextInput
              style={{
                flex: 1,
                color: colors.text,
                fontSize: 16,
                paddingVertical: 12,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 30 }}>
          <Text style={[commonStyles.text, { marginBottom: 8, fontSize: 14, fontWeight: '600' }]}>
            Password
          </Text>
          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <TextInput
              style={{
                flex: 1,
                color: colors.text,
                fontSize: 16,
                paddingVertical: 12,
              }}
              placeholder="Enter your password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 20,
            opacity: isLoading ? 0.7 : 1,
          }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
          }}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <View style={[commonStyles.row, { justifyContent: 'center' }]}>
          <Text style={commonStyles.textSecondary}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Credentials */}
        <View style={[commonStyles.card, { marginTop: 40, backgroundColor: colors.backgroundAlt }]}>
          <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600', marginBottom: 8 }]}>
            Demo Credentials
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            Email: demo@hrms.com{'\n'}
            Password: demo123
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
