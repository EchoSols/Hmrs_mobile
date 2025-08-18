
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import AuthGuard from '../components/AuthGuard';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

interface PerformanceRecord {
  id: string;
  employeeName: string;
  department: string;
  currentScore: number;
  previousScore: number;
  goals: number;
  goalsCompleted: number;
  trend: 'up' | 'down' | 'stable';
}

function PerformanceContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter');

  console.log('Performance screen loaded');

  // Mock data for demonstration
  const performanceRecords: PerformanceRecord[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      department: 'Engineering',
      currentScore: 92,
      previousScore: 88,
      goals: 8,
      goalsCompleted: 7,
      trend: 'up'
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      department: 'Marketing',
      currentScore: 89,
      previousScore: 91,
      goals: 6,
      goalsCompleted: 5,
      trend: 'down'
    },
    {
      id: '3',
      employeeName: 'Mike Davis',
      department: 'Sales',
      currentScore: 85,
      previousScore: 85,
      goals: 10,
      goalsCompleted: 8,
      trend: 'stable'
    },
    {
      id: '4',
      employeeName: 'Emily Brown',
      department: 'HR',
      currentScore: 94,
      previousScore: 90,
      goals: 5,
      goalsCompleted: 5,
      trend: 'up'
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      case 'stable': return 'remove';
      default: return 'help';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return colors.success;
      case 'down': return colors.error;
      case 'stable': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  const averageScore = performanceRecords.reduce((sum, record) => sum + record.currentScore, 0) / performanceRecords.length;
  const totalGoals = performanceRecords.reduce((sum, record) => sum + record.goals, 0);
  const completedGoals = performanceRecords.reduce((sum, record) => sum + record.goalsCompleted, 0);

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={commonStyles.header}
      >
        <View style={[commonStyles.row, { marginBottom: 16 }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 8,
              marginRight: 16,
            }}
          >
            <Ionicons name="arrow-back" size={20} color={colors.background} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.title, { color: colors.background }]}>Performance Tracking</Text>
            <Text style={[commonStyles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Employee performance overview
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons name="settings" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Performance Overview */}
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <Text style={commonStyles.metric}>{averageScore.toFixed(1)}%</Text>
            <Text style={commonStyles.metricLabel}>Average Score</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <Text style={commonStyles.metric}>{completedGoals}/{totalGoals}</Text>
            <Text style={commonStyles.metricLabel}>Goals Completed</Text>
          </View>
        </View>

        {/* Period Filter */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Performance Period
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['This Month', 'This Quarter', 'This Year', 'All Time'].map((period, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: period === selectedPeriod ? colors.primary : colors.backgroundAlt,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 12,
                }}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={{
                  color: period === selectedPeriod ? colors.background : colors.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Performance Records */}
        <Text style={commonStyles.sectionTitle}>Individual Performance</Text>
        {performanceRecords.map((record) => (
          <View key={record.id} style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {record.employeeName}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {record.department}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', marginRight: 8 }]}>
                    {record.currentScore}%
                  </Text>
                  <Ionicons 
                    name={getTrendIcon(record.trend) as any} 
                    size={20} 
                    color={getTrendColor(record.trend)} 
                  />
                </View>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  Previous: {record.previousScore}%
                </Text>
              </View>
            </View>

            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Goals Progress</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {record.goalsCompleted} of {record.goals} completed
                </Text>
              </View>
              <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                {Math.round((record.goalsCompleted / record.goals) * 100)}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 8,
              height: 8,
              overflow: 'hidden',
            }}>
              <View style={{
                backgroundColor: colors.primary,
                height: '100%',
                width: `${(record.goalsCompleted / record.goals) * 100}%`,
                borderRadius: 8,
              }} />
            </View>
          </View>
        ))}

        {/* Performance Categories */}
        <Text style={commonStyles.sectionTitle}>Performance Categories</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {[
            { title: 'Technical\nSkills', score: 88, color: colors.primary },
            { title: 'Communication', score: 92, color: colors.success },
            { title: 'Leadership', score: 85, color: colors.warning },
            { title: 'Innovation', score: 90, color: colors.accent },
          ].map((category, index) => (
            <View key={index} style={[commonStyles.card, { width: '47%', marginRight: index % 2 === 0 ? '6%' : 0 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8, textAlign: 'center' }]}>
                {category.title}
              </Text>
              <Text style={[commonStyles.metric, { textAlign: 'center', color: category.color }]}>
                {category.score}%
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function Performance() {
  return (
    <AuthGuard>
      <PerformanceContent />
    </AuthGuard>
  );
}
