
import { useState } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AuthGuard from '../components/AuthGuard';

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

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeName: 'Sarah Johnson',
      date: '2024-01-15',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      totalHours: '8h 00m',
      status: 'present'
    },
    {
      id: '2',
      employeeName: 'Michael Chen',
      date: '2024-01-15',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      totalHours: '8h 00m',
      status: 'late'
    },
    {
      id: '3',
      employeeName: 'Emily Rodriguez',
      date: '2024-01-15',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM',
      totalHours: '8h 00m',
      status: 'present'
    },
    {
      id: '4',
      employeeName: 'David Kim',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      totalHours: '0h 00m',
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

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { marginLeft: 16 }]}>Time & Attendance</Text>
        </View>
        <Text style={commonStyles.subtitle}>Track employee attendance and hours</Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <Text style={commonStyles.metric}>96%</Text>
            <Text style={commonStyles.metricLabel}>Attendance Rate</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <Text style={commonStyles.metric}>8.2h</Text>
            <Text style={commonStyles.metricLabel}>Avg. Hours/Day</Text>
          </View>
        </View>

        {/* Clock In/Out Section */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.success,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
                flex: 1,
                marginRight: 8,
                alignItems: 'center',
              }}
              onPress={() => console.log('Clock in pressed')}
            >
              <Ionicons name="log-in-outline" size={20} color={colors.text} style={{ marginBottom: 4 }} />
              <Text style={{ color: colors.text, fontWeight: '600' }}>Clock In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.error,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
                flex: 1,
                marginLeft: 8,
                alignItems: 'center',
              }}
              onPress={() => console.log('Clock out pressed')}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.text} style={{ marginBottom: 4 }} />
              <Text style={{ color: colors.text, fontWeight: '600' }}>Clock Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Filter */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
            Select Date
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
            <Text style={commonStyles.text}>{selectedDate}</Text>
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Attendance Records */}
        <Text style={commonStyles.sectionTitle}>Today&apos;s Attendance</Text>
        {attendanceRecords.map((record) => (
          <View key={record.id} style={[commonStyles.card, { marginBottom: 12 }]}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {record.employeeName}
              </Text>
              <View style={{
                backgroundColor: getStatusColor(record.status),
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
                <Text style={[commonStyles.badgeText, { fontSize: 10 }]}>
                  {record.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={commonStyles.textSecondary}>Check In</Text>
                <Text style={commonStyles.text}>{record.checkIn}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={commonStyles.textSecondary}>Check Out</Text>
                <Text style={commonStyles.text}>{record.checkOut}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={commonStyles.textSecondary}>Total Hours</Text>
                <Text style={commonStyles.text}>{record.totalHours}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
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
