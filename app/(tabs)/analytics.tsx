
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../../styles/commonStyles';
import AuthGuard from '../../components/AuthGuard';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

function AnalyticsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  console.log('Analytics screen loaded');

  // Mock analytics data
  const analyticsData = {
    totalEmployees: 156,
    activeEmployees: 142,
    avgPerformance: 87.5,
    attendanceRate: 94.2,
    satisfactionScore: 4.3,
    turnoverRate: 2.1,
  };

  const departmentData = [
    { name: 'Engineering', employees: 45, performance: 92.1, attendance: 96.5 },
    { name: 'Marketing', employees: 28, performance: 88.7, attendance: 93.2 },
    { name: 'Sales', employees: 35, performance: 85.3, attendance: 91.8 },
    { name: 'HR', employees: 12, performance: 89.4, attendance: 97.1 },
    { name: 'Finance', employees: 18, performance: 90.2, attendance: 95.3 },
  ];

  const trends = [
    { metric: 'Performance', value: '+5.2%', trend: 'up', color: colors.success },
    { metric: 'Attendance', value: '+2.1%', trend: 'up', color: colors.primary },
    { metric: 'Satisfaction', value: '-0.3%', trend: 'down', color: colors.error },
    { metric: 'Turnover', value: '-1.2%', trend: 'down', color: colors.success },
  ];

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
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.title, { color: colors.background }]}>Analytics & Reports</Text>
            <Text style={[commonStyles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              Comprehensive HR insights
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 12,
            }}
          >
            <Ionicons name="download" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Period Filter */}
        <View style={[commonStyles.card, { marginTop: 20, marginBottom: 20 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Time Period
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['This Week', 'This Month', 'This Quarter', 'This Year'].map((period, index) => (
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

        {/* Key Metrics */}
        <Text style={commonStyles.sectionTitle}>Key Metrics</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
          <View style={[commonStyles.card, { width: '47%', marginRight: '6%', marginBottom: 16 }]}>
            <Text style={commonStyles.metric}>{analyticsData.totalEmployees}</Text>
            <Text style={commonStyles.metricLabel}>Total Employees</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="trending-up" size={16} color={colors.success} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
                +12 this month
              </Text>
            </View>
          </View>

          <View style={[commonStyles.card, { width: '47%', marginBottom: 16 }]}>
            <Text style={commonStyles.metric}>{analyticsData.avgPerformance}%</Text>
            <Text style={commonStyles.metricLabel}>Avg Performance</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="trending-up" size={16} color={colors.success} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
                +5.2% vs last month
              </Text>
            </View>
          </View>

          <View style={[commonStyles.card, { width: '47%', marginRight: '6%' }]}>
            <Text style={commonStyles.metric}>{analyticsData.attendanceRate}%</Text>
            <Text style={commonStyles.metricLabel}>Attendance Rate</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="trending-up" size={16} color={colors.primary} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
                +2.1% vs last month
              </Text>
            </View>
          </View>

          <View style={[commonStyles.card, { width: '47%' }]}>
            <Text style={commonStyles.metric}>{analyticsData.satisfactionScore}</Text>
            <Text style={commonStyles.metricLabel}>Satisfaction Score</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Ionicons name="trending-down" size={16} color={colors.error} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
                -0.3% vs last month
              </Text>
            </View>
          </View>
        </View>

        {/* Trends */}
        <Text style={commonStyles.sectionTitle}>Performance Trends</Text>
        <View style={commonStyles.card}>
          {trends.map((trend, index) => (
            <View key={index} style={[commonStyles.row, { marginBottom: index < trends.length - 1 ? 16 : 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {trend.metric}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  vs previous period
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons 
                  name={trend.trend === 'up' ? 'trending-up' : 'trending-down'} 
                  size={20} 
                  color={trend.color} 
                />
                <Text style={[commonStyles.text, { 
                  marginLeft: 8, 
                  fontWeight: '600',
                  color: trend.color 
                }]}>
                  {trend.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Department Breakdown */}
        <Text style={commonStyles.sectionTitle}>Department Breakdown</Text>
        {departmentData.map((dept, index) => (
          <View key={index} style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
                {dept.name}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {dept.employees} employees
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Performance</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {dept.performance}%
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Attendance</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {dept.attendance}%
                </Text>
              </View>
            </View>

            {/* Performance Bar */}
            <View style={{ marginTop: 12 }}>
              <View style={{
                backgroundColor: colors.backgroundAlt,
                borderRadius: 8,
                height: 8,
                overflow: 'hidden',
              }}>
                <View style={{
                  backgroundColor: colors.primary,
                  height: '100%',
                  width: `${dept.performance}%`,
                  borderRadius: 8,
                }} />
              </View>
            </View>
          </View>
        ))}

        {/* Quick Reports */}
        <Text style={commonStyles.sectionTitle}>Quick Reports</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {[
            { title: 'Monthly\nReport', icon: 'document-text-outline', color: colors.primary },
            { title: 'Performance\nAnalysis', icon: 'trending-up-outline', color: colors.success },
            { title: 'Attendance\nSummary', icon: 'time-outline', color: colors.warning },
            { title: 'Custom\nReport', icon: 'settings-outline', color: colors.secondary },
          ].map((report, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { width: '47%', marginRight: index % 2 === 0 ? '6%' : 0, marginBottom: 16 }]}
            >
              <View style={commonStyles.center}>
                <View style={{
                  backgroundColor: report.color,
                  borderRadius: 20,
                  padding: 12,
                  marginBottom: 8,
                }}>
                  <Ionicons name={report.icon as any} size={20} color={colors.background} />
                </View>
                <Text style={[commonStyles.textSecondary, { 
                  textAlign: 'center', 
                  fontSize: 12, 
                  fontWeight: '600',
                  lineHeight: 16,
                }]}>
                  {report.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
