
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../styles/commonStyles';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  text?: string;
}

export default function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  color = colors.primary,
  backgroundColor = colors.card,
  showText = true,
  text,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {showText && (
        <Text style={{
          fontSize: size * 0.2,
          fontWeight: '700',
          color: colors.text,
          textAlign: 'center',
        }}>
          {text || `${Math.round(progress)}%`}
        </Text>
      )}
    </View>
  );
}
