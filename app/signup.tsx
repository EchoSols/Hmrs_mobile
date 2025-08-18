
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();

  console.log('Signup screen loaded');

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    console.log('Attempting signup...');

    try {
      const success = await signup(name, email, password);
      if (success) {
        console.log('Signup successful, redirecting to dashboard');
        router.replace('/');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.log('Signup error:', error);
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
        <TouchableOpacity
          style={{ position: 'absolute', top: 60, left: 20, zIndex: 1 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={commonStyles.center}>
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 30,
            padding: 20,
            marginBottom: 20,
          }}>
            <Ionicons name="person-add-outline" size={40} color={colors.text} />
          </View>
          <Text style={[commonStyles.title, { textAlign: 'center' }]}>Create Account</Text>
          <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>
            Join our HR Management platform
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={[commonStyles.content, { paddingTop: 40 }]} showsVerticalScrollIndicator={false}>
        {/* Name Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.text, { marginBottom: 8, fontSize: 14, fontWeight: '600' }]}>
            Full Name
          </Text>
          <View style={{
            backgroundColor: colors.card,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
            <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <TextInput
              style={{
                flex: 1,
                color: colors.text,
                fontSize: 16,
                paddingVertical: 12,
              }}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>

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
        <View style={{ marginBottom: 20 }}>
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
              placeholder="Create a password"
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

        {/* Confirm Password Input */}
        <View style={{ marginBottom: 30 }}>
          <Text style={[commonStyles.text, { marginBottom: 8, fontSize: 14, fontWeight: '600' }]}>
            Confirm Password
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
              placeholder="Confirm your password"
              placeholderTextColor={colors.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 20,
            opacity: isLoading ? 0.7 : 1,
          }}
          onPress={handleSignup}
          disabled={isLoading}
        >
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
          }}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={[commonStyles.row, { justifyContent: 'center', marginBottom: 40 }]}>
          <Text style={commonStyles.textSecondary}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
