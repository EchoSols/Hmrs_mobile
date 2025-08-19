import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useEmployees } from '../../hooks/useData';
import AuthGuard from '../../components/AuthGuard';
import ProgressRing from '../../components/ProgressRing';
import { Employee } from '../../types';
import { useState, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../../components/BottomSheet';
import { LinearGradient } from 'expo-linear-gradient';

function EmployeesContent() {
  const { employees, loading } = useEmployees();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  console.log('Employees screen loaded with', employees.length, 'employees');

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading employees...</Text>
      </View>
    );
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    console.log('Opening add employee form');
    // This would typically navigate to an add employee screen
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
            <Text style={commonStyles.title}>Employee Management</Text>
            <Text style={commonStyles.subtitle}>
              {filteredEmployees.length} employees found
            </Text>
          </View>
          <TouchableOpacity
            onPress={openAddEmployee}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons name="person-add" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
          <TextInput
            style={[commonStyles.text, { flex: 1, marginLeft: 12 }]}
            placeholder="Search employees..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Employee Stats */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <Text style={commonStyles.metric}>
              {employees.filter(emp => emp.status === 'active').length}
            </Text>
            <Text style={commonStyles.metricLabel}>Active</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <Text style={commonStyles.metric}>
              {employees.filter(emp => emp.status === 'on-leave').length}
            </Text>
            <Text style={commonStyles.metricLabel}>On Leave</Text>
          </View>
        </View>

        {/* Employee List */}
        {filteredEmployees.map((employee) => (
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
                    marginRight: 16,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {employee.name}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {employee.position} • {employee.department}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 2 }]}>
                    ID: {employee.employeeId}
                  </Text>
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
                    color={colors.background} 
                  />
                  <Text style={{
                    color: colors.background,
                    fontSize: 12,
                    fontWeight: '600',
                    marginLeft: 4,
                    textTransform: 'capitalize',
                  }}>
                    {employee.status.replace('-', ' ')}
                  </Text>
                </View>
                <ProgressRing 
                  progress={employee.performanceScore} 
                  size={40} 
                  strokeWidth={3}
                  color={colors.primary}
                  showText={false}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredEmployees.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 40 }]}>
            <Ionicons name="people-outline" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No employees found
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
              Try adjusting your search criteria
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Employee Details Bottom Sheet */}
      <CustomBottomSheet ref={bottomSheetRef} title="Employee Details">
        {selectedEmployee && (
          <ScrollView>
            <View style={[commonStyles.card, { alignItems: 'center' }]}>
              <Image
                source={{ uri: selectedEmployee.avatar }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginBottom: 16,
                }}
              />
              <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', marginBottom: 8 }]}>
                {selectedEmployee.name}
              </Text>
              <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
                {selectedEmployee.position} • {selectedEmployee.department}
              </Text>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: getStatusColor(selectedEmployee.status),
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}>
                <Ionicons 
                  name={getStatusIcon(selectedEmployee.status) as any} 
                  size={16} 
                  color={colors.background} 
                />
                <Text style={{
                  color: colors.background,
                  fontSize: 14,
                  fontWeight: '600',
                  marginLeft: 6,
                  textTransform: 'capitalize',
                }}>
                  {selectedEmployee.status.replace('-', ' ')}
                </Text>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Contact Information
              </Text>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                  {selectedEmployee.email}
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                  {selectedEmployee.phone}
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                  Joined {selectedEmployee.hireDate}
                </Text>
              </View>
            </View>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Performance Metrics
              </Text>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.textSecondary}>Performance Score</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEmployee.performanceScore}%
                  </Text>
                </View>
                <ProgressRing 
                  progress={selectedEmployee.performanceScore} 
                  size={60} 
                  strokeWidth={4}
                  color={colors.primary}
                  text={`${selectedEmployee.performanceScore}%`}
                />
              </View>
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.textSecondary}>Salary</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    ${selectedEmployee.salary.toLocaleString()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.textSecondary}>Employee ID</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEmployee.employeeId}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
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
