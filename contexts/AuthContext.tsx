
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      
      // Simulate API call - in real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be server-side validation
      if (email && password.length >= 6) {
        const userData: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: 'HR Manager'
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('Login successful for:', email);
        return true;
      }
      
      console.log('Login failed: Invalid credentials');
      return false;
    } catch (error) {
      console.log('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting signup for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (name && email && password.length >= 6) {
        const userData: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: 'HR Manager'
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('Signup successful for:', email);
        return true;
      }
      
      console.log('Signup failed: Invalid data');
      return false;
    } catch (error) {
      console.log('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
