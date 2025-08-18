
import { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import { useEmployees } from '../hooks/useData';
import { Employee } from '../types';
import AuthGuard from '../components/AuthGuard';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../components/BottomSheet';
import ProgressRing from '../components/ProgressRing';

function EmployeesContent() {
  const { employees, loading, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const addEmployeeSheetRef = useRef<BottomSheet>(null);

  console.log('Employees screen loaded');

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading employees...</Text>
      </View>
    );
  }

  const departments = ['All', ...Array.from(new Set(employees.map(emp => emp.department)))];
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return colors.success;
      case 'inactive': return colors.error;
      case 'on-leave': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'checkmark-circle';
      case 'inactive': return 'close-circle';
      case 'on-leave': return 'time';
      default: return 'help-circle';
    }
  };

  const openEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    bottomSheetRef.current?.expand();
  };

  const openAddEmployee = () => {
    addEmployeeSheetRef.current?.expand();
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.header, { backgroundColor: colors.backgroundAlt }]}>
        <View style={[commonStyles.row, { marginBottom: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginRight: 24 }]}>
            Employee Management
          </Text>
        </View>

        {/* Search Bar */}
        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 16,
        }}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 12,
              color: colors.text,
              fontSize: 16,
            }}
            placeholder="Search employees..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Department Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {departments.map((dept, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: selectedDepartment === dept ? colors.primary : colors.card,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 12,
              }}
              onPress={() => setSelectedDepartment(dept)}
            >
              <Text style={{
                color: selectedDepartment === dept ? colors.text : colors.textSecondary,
                fontWeight: '600',
              }}>
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <Text style={commonStyles.metric}>{filteredEmployees.length}</Text>
            <Text style={commonStyles.metricLabel}>Total Employees</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <Text style={commonStyles.metric}>
              {filteredEmployees.filter(emp => emp.status === 'active').length}
            </Text>
            <Text style={commonStyles.metricLabel}>Active</Text>
          </View>
        </View>

        {/* Employee List */}
        {filteredEmployees.map((employee, index) => (
          <TouchableOpacity
            key={employee.id}
            style={commonStyles.card}
            onPress={() => openEmployeeDetails(employee)}
          >
            <View style={commonStyles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Image
                  source={{ uri: employee.avatar }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>{employee.name}</Text>
                  <Text style={commonStyles.textSecondary}>{employee.position}</Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>{employee.department}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: getStatusColor(employee.status),
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginBottom: 8,
                }}>
                  <Ionicons 
                    name={getStatusIcon(employee.status) as any} 
                    size={12} 
                    color={colors.text} 
                  />
                  <Text style={[commonStyles.badgeText, { marginLeft: 4 }]}>
                    {employee.status}
                  </Text>
                </View>
                <ProgressRing 
                  progress={employee.performanceScore} 
                  size={30} 
                  strokeWidth={3}
                  color={colors.accent}
                  showText={false}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Employee Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          backgroundColor: colors.primary,
          borderRadius: 28,
          width: 56,
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          elevation: 8,
        }}
        onPress={openAddEmployee}
      >
        <Ionicons name="add" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.navText, { color: colors.text }]}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={commonStyles.navItem} onPress={() => router.push('/employees')}>
          <Ionicons name="people" size={24} color={colors.primary} />
          <Text style={[commonStyles.navText, { color: colors.primary }]}>Employees</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={commonStyles.navItem} onPress={() => router.push('/attendance')}>
          <Ionicons name="time-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.navText, { color: colors.text }]}>Attendance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={commonStyles.navItem} onPress={() => router.push('/analytics')}>
          <Ionicons name="analytics-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.navText, { color: colors.text }]}>Analytics</Text>
        </TouchableOpacity>
      </View>

      {/* Employee Details Bottom Sheet */}
      <CustomBottomSheet ref={bottomSheetRef} title="Employee Details">
        {selectedEmployee && (
          <ScrollView>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={{ uri: selectedEmployee.avatar }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginBottom: 12,
                }}
              />
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700' }]}>
                {selectedEmployee.name}
              </Text>
              <Text style={commonStyles.textSecondary}>{selectedEmployee.position}</Text>
              <Text style={commonStyles.textSecondary}>{selectedEmployee.department}</Text>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Contact Information</Text>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Ionicons name="mail-outline" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>{selectedEmployee.email}</Text>
              </View>
              <View style={commonStyles.row}>
                <Ionicons name="call-outline" size={16} color={colors.textSecondary} />
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>{selectedEmployee.phone}</Text>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Performance Metrics</Text>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ alignItems: 'center' }}>
                  <ProgressRing 
                    progress={selectedEmployee.performanceScore} 
                    size={60} 
                    strokeWidth={4}
                    color={colors.accent}
                  />
                  <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>Performance</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <ProgressRing 
                    progress={selectedEmployee.attendanceRate} 
                    size={60} 
                    strokeWidth={4}
                    color={colors.success}
                  />
                  <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>Attendance</Text>
                </View>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {selectedEmployee.skills.map((skill, index) => (
                  <View key={index} style={{
                    backgroundColor: colors.primary,
                    borderRadius: 16,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                    <Text style={[commonStyles.badgeText, { fontSize: 12 }]}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </CustomBottomSheet>

      {/* Add Employee Bottom Sheet */}
      <CustomBottomSheet ref={addEmployeeSheetRef} title="Add New Employee">
        <ScrollView>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 20 }]}>
            Employee management functionality would be implemented here with form fields for:
          </Text>
          <View style={commonStyles.card}>
            <Text style={commonStyles.textSecondary}>• Personal Information</Text>
            <Text style={commonStyles.textSecondary}>• Contact Details</Text>
            <Text style={commonStyles.textSecondary}>• Position & Department</Text>
            <Text style={commonStyles.textSecondary}>• Salary & Benefits</Text>
            <Text style={commonStyles.textSecondary}>• Skills & Qualifications</Text>
            <Text style={commonStyles.textSecondary}>• Manager Assignment</Text>
          </View>
        </ScrollView>
      </CustomBottomSheet>
    </View>
  );
}

export default function Employees() {
  return (
    <AuthGuard>
      <EmployeesContent />
    </AuthGuard>
  );
}
