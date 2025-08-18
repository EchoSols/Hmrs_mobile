
import { useState } from 'react';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AuthGuard from '../components/AuthGuard';

function AnalyticsContent() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');

  console.log('Analytics screen loaded');

  const kpis = [
    { label: 'Employee Satisfaction', value: '4.2/5', change: '+0.3', trend: 'up' },
    { label: 'Turnover Rate', value: '8.5%', change: '-2.1%', trend: 'down' },
    { label: 'Productivity Index', value: '92%', change: '+5%', trend: 'up' },
    { label: 'Training Completion', value: '87%', change: '+12%', trend: 'up' },
  ];

  const departmentData = [
    { name: 'Engineering', employees: 45, satisfaction: 4.3, performance: 94 },
    { name: 'Marketing', employees: 23, satisfaction: 4.1, performance: 89 },
    { name: 'Sales', employees: 31, satisfaction: 4.0, performance: 91 },
    { name: 'HR', employees: 12, satisfaction: 4.4, performance: 88 },
  ];

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.gradient.middle, colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={commonStyles.header}
      >
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { marginLeft: 16 }]}>Analytics</Text>
        </View>
        <Text style={commonStyles.subtitle}>Insights and performance metrics</Text>
      </LinearGradient>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Timeframe Selector */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Timeframe
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={commonStyles.text}>{selectedTimeframe}</Text>
            <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Key Performance Indicators */}
        <Text style={commonStyles.sectionTitle}>Key Performance Indicators</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[commonStyles.card, { width: '47%', marginRight: index % 2 === 0 ? '6%' : 0, marginBottom: 12 }]}>
              <Text style={[commonStyles.metric, { fontSize: 24 }]}>{kpi.value}</Text>
              <Text style={[commonStyles.metricLabel, { marginBottom: 8 }]}>{kpi.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons 
                  name={kpi.trend === 'up' ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  color={kpi.trend === 'up' ? colors.success : colors.error} 
                />
                <Text style={{
                  color: kpi.trend === 'up' ? colors.success : colors.error,
                  fontSize: 12,
                  fontWeight: '600',
                  marginLeft: 4,
                }}>
                  {kpi.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Department Breakdown */}
        <Text style={commonStyles.sectionTitle}>Department Overview</Text>
        {departmentData.map((dept, index) => (
          <View key={index} style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
                {dept.name}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {dept.employees} employees
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700' }]}>
                  {dept.satisfaction}
                </Text>
                <Text style={commonStyles.textSecondary}>Satisfaction</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700' }]}>
                  {dept.performance}%
                </Text>
                <Text style={commonStyles.textSecondary}>Performance</Text>
              </View>
            </View>

            {/* Performance Bar */}
            <View style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 8,
              height: 8,
              overflow: 'hidden',
            }}>
              <LinearGradient
                colors={[colors.primary, colors.success]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: '100%',
                  width: `${dept.performance}%`,
                }}
              />
            </View>
          </View>
        ))}

        {/* Recent Trends */}
        <Text style={commonStyles.sectionTitle}>Recent Trends</Text>
        <View style={commonStyles.card}>
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: colors.success,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="trending-up" size={16} color={colors.text} />
              </View>
              <View>
                <Text style={commonStyles.text}>Employee Engagement Up</Text>
                <Text style={commonStyles.textSecondary}>15% increase this quarter</Text>
              </View>
            </View>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: colors.warning,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="time-outline" size={16} color={colors.text} />
              </View>
              <View>
                <Text style={commonStyles.text}>Training Hours Increased</Text>
                <Text style={commonStyles.textSecondary}>Average 2.5h per employee</Text>
              </View>
            </View>
          </View>

          <View style={commonStyles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="people-outline" size={16} color={colors.text} />
              </View>
              <View>
                <Text style={commonStyles.text}>New Hires Onboarded</Text>
                <Text style={commonStyles.textSecondary}>12 new team members</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

export default function Analytics() {
  return (
    <AuthGuard>
      <AnalyticsContent />
    </AuthGuard>
  );
}
