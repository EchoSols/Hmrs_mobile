import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors } from '../../styles/commonStyles';
import AuthGuard from '../../components/AuthGuard';
import { useState } from 'react';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'present' | 'late' | 'absent' | 'half-day';
}

function AttendanceContent() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  console.log('Attendance screen loaded');

  // Mock data for demonstration
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      date: '2024-01-15',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      totalHours: '8h 0m',
      status: 'present'
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      date: '2024-01-15',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      totalHours: '8h 0m',
      status: 'late'
    },
    {
      id: '3',
      employeeName: 'Mike Davis',
      date: '2024-01-15',
      checkIn: '09:00 AM',
      checkOut: '01:00 PM',
      totalHours: '4h 0m',
      status: 'half-day'
    },
    {
      id: '4',
      employeeName: 'Emily Brown',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      totalHours: '0h 0m',
      status: 'absent'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return colors.success;
      case 'late': return colors.warning;
      case 'absent': return colors.error;
      case 'half-day': return colors.accent;
      default: return colors.textSecondary;
    }
  };

  const todayStats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    halfDay: attendanceRecords.filter(r => r.status === 'half-day').length,
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.gradient.middle, colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={commonStyles.header}
      >
        <View style={[commonStyles.row, { marginBottom: 16 }]}> 
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>Time & Attendance</Text>
            <Text style={commonStyles.subtitle}>Today's attendance overview</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons name="calendar" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Attendance Stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
          <View style={[commonStyles.card, { width: '47%', marginRight: '6%', marginBottom: 16 }]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.metric}>{todayStats.present}</Text>
                <Text style={commonStyles.metricLabel}>Present</Text>
              </View>
              <Ionicons name="checkmark-circle" size={32} color={colors.success} />
            </View>
          </View>
          
          <View style={[commonStyles.card, { width: '47%', marginBottom: 16 }]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.metric}>{todayStats.late}</Text>
                <Text style={commonStyles.metricLabel}>Late</Text>
              </View>
              <Ionicons name="time" size={32} color={colors.warning} />
            </View>
          </View>

          <View style={[commonStyles.card, { width: '47%', marginRight: '6%' }]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.metric}>{todayStats.absent}</Text>
                <Text style={commonStyles.metricLabel}>Absent</Text>
              </View>
              <Ionicons name="close-circle" size={32} color={colors.error} />
            </View>
          </View>

          <View style={[commonStyles.card, { width: '47%' }]}>
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.metric}>{todayStats.halfDay}</Text>
                <Text style={commonStyles.metricLabel}>Half Day</Text>
              </View>
              <Ionicons name="partly-sunny" size={32} color={colors.accent} />
            </View>
          </View>
        </View>

        {/* Date Filter */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Filter by Date
          </Text>
          <View style={[commonStyles.row, { flexWrap: 'wrap' }]}>
            {['Today', 'Yesterday', 'This Week', 'This Month'].map((period, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: index === 0 ? colors.primary : colors.backgroundAlt,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={{
                  color: index === 0 ? colors.background : colors.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Attendance Records */}
        <Text style={commonStyles.sectionTitle}>Today's Records</Text>
        {attendanceRecords.map((record) => (
          <View key={record.id} style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {record.employeeName}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {record.date}
                </Text>
              </View>
              <View style={{
                backgroundColor: getStatusColor(record.status),
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
                <Text style={{
                  color: colors.background,
                  fontSize: 12,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                  {record.status.replace('-', ' ')}
                </Text>
              </View>
            </View>
            
            <View style={commonStyles.row}>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Check In</Text>
                <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                  {record.checkIn}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Check Out</Text>
                <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                  {record.checkOut}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.textSecondary}>Total Hours</Text>
                <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                  {record.totalHours}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <View style={commonStyles.center}>
              <Ionicons name="download-outline" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginTop: 8, fontWeight: '600' }]}>
                Export Report
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <View style={commonStyles.center}>
              <Ionicons name="settings-outline" size={24} color={colors.secondary} />
              <Text style={[commonStyles.text, { marginTop: 8, fontWeight: '600' }]}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default function Attendance() {
  return (
    <AuthGuard>
      <AttendanceContent />
    </AuthGuard>
  );
}
