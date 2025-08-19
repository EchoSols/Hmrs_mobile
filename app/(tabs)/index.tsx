
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useEmployees, useAnalytics, useLeaveRequests, useTasks } from '../../hooks/useData';
import AuthGuard from '../../components/AuthGuard';
import ProgressRing from '../../components/ProgressRing';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../../components/BottomSheet';

function DashboardContent() {
  const { user, logout } = useAuth();
  const { employees, loading: employeesLoading } = useEmployees();
  const { analytics, loading: analyticsLoading } = useAnalytics();
  const { leaveRequests } = useLeaveRequests();
  const { tasks } = useTasks();
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  console.log('Dashboard screen loaded for user:', user?.name);

  if (employeesLoading || analyticsLoading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading dashboard...</Text>
      </View>
    );
  }

  const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'pending').length;
  const activeTasks = tasks.filter(task => task.status !== 'completed').length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;

  const metrics = [
    { 
      label: 'Active Employees', 
      value: activeEmployees.toString(), 
      icon: 'people-outline', 
      color: colors.primary,
      total: employees.length
    },
    { 
      label: 'Satisfaction', 
      value: `${analytics?.satisfactionScore.toFixed(1)}%`, 
      icon: 'happy-outline', 
      color: colors.success,
      progress: analytics?.satisfactionScore || 0
    },
    { 
      label: 'Performance', 
      value: `${analytics?.averagePerformance.toFixed(1)}%`, 
      icon: 'trending-up-outline', 
      color: colors.accent,
      progress: analytics?.averagePerformance || 0
    },
    { 
      label: 'Attendance', 
      value: `${analytics?.attendanceRate.toFixed(1)}%`, 
      icon: 'checkmark-circle-outline', 
      color: colors.warning,
      progress: analytics?.attendanceRate || 0
    },
  ];

  const quickActions = [
    { title: 'Employee\nManagement', icon: 'people-outline', route: '/(tabs)/employees', color: colors.primary },
    { title: 'Time &\nAttendance', icon: 'time-outline', route: '/(tabs)/attendance', color: colors.secondary },
    { title: 'Performance\nTracking', icon: 'trending-up-outline', route: '/performance', color: colors.accent },
    { title: 'Analytics &\nReports', icon: 'analytics-outline', route: '/(tabs)/analytics', color: colors.success },
    { title: 'Leave\nManagement', icon: 'calendar-outline', route: '/leave', color: colors.warning },
    { title: 'Task\nManagement', icon: 'list-outline', route: '/tasks', color: colors.error },
  ];

  const handleLogout = async () => {
    console.log('Logging out user');
    await logout();
    router.replace('/login');
  };

  const openNotifications = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={commonStyles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.gradient.start, colors.gradient.middle, colors.gradient.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={commonStyles.header}
      >
        <View style={[commonStyles.row, { marginBottom: 16 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.title, { color: colors.background }]}>Welcome back, {user?.name}!</Text>
            <Text style={[commonStyles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
              {user?.role} • {user?.department}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={openNotifications}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 20,
                padding: 8,
                position: 'relative',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={colors.background} />
              {(pendingLeaveRequests > 0 || activeTasks > 0) && (
                <View style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: colors.error,
                  borderRadius: 8,
                  width: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ color: colors.background, fontSize: 10, fontWeight: '600' }}>
                    {pendingLeaveRequests + activeTasks}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Key Metrics with Progress Rings */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          {metrics.map((metric, index) => (
            <View key={index} style={[commonStyles.card, { width: '47%', marginRight: index % 2 === 0 ? '6%' : 0 }]}>
              <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.metric}>{metric.value}</Text>
                  <Text style={commonStyles.metricLabel}>{metric.label}</Text>
                </View>
                {metric.progress ? (
                  <ProgressRing 
                    progress={metric.progress} 
                    size={50} 
                    strokeWidth={4}
                    color={metric.color}
                    showText={false}
                  />
                ) : (
                  <Ionicons name={metric.icon as any} size={32} color={metric.color} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions Grid */}
        <Text style={commonStyles.sectionTitle}>Quick Actions</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { width: '30%', marginRight: index % 3 === 2 ? 0 : '5%' }]}
              onPress={() => {
                console.log(`Navigating to ${action.route}`);
                router.push(action.route);
              }}
            >
              <View style={commonStyles.center}>
                <View style={{
                  backgroundColor: action.color,
                  borderRadius: 20,
                  padding: 12,
                  marginBottom: 8,
                }}>
                  <Ionicons name={action.icon as any} size={20} color={colors.background} />
                </View>
                <Text style={[commonStyles.textSecondary, { 
                  textAlign: 'center', 
                  fontSize: 12, 
                  fontWeight: '600',
                  lineHeight: 16,
                }]}>
                  {action.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Department Overview */}
        <Text style={commonStyles.sectionTitle}>Department Overview</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {analytics?.departmentMetrics.map((dept, index) => (
            <View key={index} style={[commonStyles.card, { width: 200, marginRight: 16 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>{dept.department}</Text>
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.textSecondary}>Employees</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>{dept.employeeCount}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.textSecondary}>Performance</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>{dept.performanceAvg.toFixed(1)}%</Text>
                </View>
              </View>
              <View style={{ marginTop: 12 }}>
                <ProgressRing 
                  progress={dept.attendanceRate} 
                  size={60} 
                  strokeWidth={4}
                  color={colors.success}
                  text={`${dept.attendanceRate.toFixed(0)}%`}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Recent Activity */}
        <Text style={commonStyles.sectionTitle}>Recent Activity</Text>
        <View style={commonStyles.card}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{
                backgroundColor: colors.success,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="person-add-outline" size={16} color={colors.background} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.text}>New Employee Added</Text>
                <Text style={commonStyles.textSecondary}>Sarah Johnson joined Marketing</Text>
              </View>
            </View>
            <Text style={commonStyles.textSecondary}>2h ago</Text>
          </View>
          
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="document-text-outline" size={16} color={colors.background} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.text}>Performance Review</Text>
                <Text style={commonStyles.textSecondary}>Q4 reviews completed</Text>
              </View>
            </View>
            <Text style={commonStyles.textSecondary}>5h ago</Text>
          </View>

          <View style={commonStyles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{
                backgroundColor: colors.warning,
                borderRadius: 20,
                padding: 8,
                marginRight: 12,
              }}>
                <Ionicons name="time-outline" size={16} color={colors.background} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.text}>Leave Request</Text>
                <Text style={commonStyles.textSecondary}>{pendingLeaveRequests} pending approvals</Text>
              </View>
            </View>
            <Text style={commonStyles.textSecondary}>1d ago</Text>
          </View>
        </View>
      </ScrollView>

      {/* Notifications Bottom Sheet */}
      {/* <CustomBottomSheet ref={bottomSheetRef} title="Notifications">
        <ScrollView>
          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Ionicons name="calendar-outline" size={20} color={colors.warning} />
              <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                {pendingLeaveRequests} leave requests pending approval
              </Text>
            </View>
            <Text style={commonStyles.textSecondary}>Review and approve employee leave requests</Text>
          </View>

          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Ionicons name="list-outline" size={20} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                {activeTasks} active tasks assigned
              </Text>
            </View>
            <Text style={commonStyles.textSecondary}>Complete your assigned HR tasks</Text>
          </View>

          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Ionicons name="trending-up-outline" size={20} color={colors.success} />
              <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                Performance reviews due soon
              </Text>
            </View>
            <Text style={commonStyles.textSecondary}>Q1 performance reviews start next week</Text>
          </View>
        </ScrollView>
      </CustomBottomSheet> */}
    </View>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
