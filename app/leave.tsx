
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import { useLeaveRequests } from '../hooks/useData';
import AuthGuard from '../components/AuthGuard';
import { LeaveRequest } from '../types';
import BottomSheet from '@gorhom/bottom-sheet';
import { useState, useRef } from 'react';
import CustomBottomSheet from '../components/BottomSheet';

function LeaveManagementContent() {
  const { leaveRequests, loading } = useLeaveRequests();
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  console.log('Leave Management screen loaded with', leaveRequests.length, 'requests');

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading leave requests...</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return colors.success;
      case 'rejected': return colors.error;
      case 'pending': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vacation': return 'sunny-outline';
      case 'sick': return 'medical-outline';
      case 'personal': return 'person-outline';
      case 'maternity': return 'heart-outline';
      case 'paternity': return 'heart-outline';
      default: return 'calendar-outline';
    }
  };

  const openRequestDetails = (request: LeaveRequest) => {
    setSelectedRequest(request);
    bottomSheetRef.current?.expand();
  };

  const handleApprove = (requestId: string) => {
    console.log('Approving leave request:', requestId);
    // This would typically call an API to approve the request
    bottomSheetRef.current?.close();
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting leave request:', requestId);
    // This would typically call an API to reject the request
    bottomSheetRef.current?.close();
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'pending');
  const approvedRequests = leaveRequests.filter(req => req.status === 'approved');
  const rejectedRequests = leaveRequests.filter(req => req.status === 'rejected');

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={[commonStyles.row, { marginBottom: 16 }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 20,
              padding: 8,
              marginRight: 16,
            }}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>Leave Management</Text>
            <Text style={commonStyles.subtitle}>
              {pendingRequests.length} pending requests
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 20,
              padding: 12,
            }}
          >
            <Ionicons name="add" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={commonStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Leave Stats */}
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8 }]}>
            <Text style={commonStyles.metric}>{pendingRequests.length}</Text>
            <Text style={commonStyles.metricLabel}>Pending</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginHorizontal: 4 }]}>
            <Text style={commonStyles.metric}>{approvedRequests.length}</Text>
            <Text style={commonStyles.metricLabel}>Approved</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8 }]}>
            <Text style={commonStyles.metric}>{rejectedRequests.length}</Text>
            <Text style={commonStyles.metricLabel}>Rejected</Text>
          </View>
        </View>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <>
            <Text style={commonStyles.sectionTitle}>Pending Requests</Text>
            {pendingRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={commonStyles.card}
                onPress={() => openRequestDetails(request)}
              >
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{
                      backgroundColor: colors.primary,
                      borderRadius: 20,
                      padding: 8,
                      marginRight: 12,
                    }}>
                      <Ionicons name={getTypeIcon(request.type) as any} size={16} color={colors.background} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                        {request.employeeName}
                      </Text>
                      <Text style={commonStyles.textSecondary}>
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave
                      </Text>
                    </View>
                  </View>
                  <View style={{
                    backgroundColor: getStatusColor(request.status),
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
                      {request.status}
                    </Text>
                  </View>
                </View>
                
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={commonStyles.textSecondary}>Duration:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                    {request.startDate} - {request.endDate}
                  </Text>
                </View>
                
                <View style={commonStyles.row}>
                  <Text style={commonStyles.textSecondary}>Days:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                    {request.days} days
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* All Requests */}
        <Text style={commonStyles.sectionTitle}>All Requests</Text>
        {leaveRequests.map((request) => (
          <TouchableOpacity
            key={request.id}
            style={commonStyles.card}
            onPress={() => openRequestDetails(request)}
          >
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{
                  backgroundColor: colors.backgroundAlt,
                  borderRadius: 20,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Ionicons name={getTypeIcon(request.type) as any} size={16} color={colors.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {request.employeeName}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave
                  </Text>
                </View>
              </View>
              <View style={{
                backgroundColor: getStatusColor(request.status),
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
                  {request.status}
                </Text>
              </View>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.textSecondary}>Duration:</Text>
              <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                {request.startDate} - {request.endDate}
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <Text style={commonStyles.textSecondary}>Days:</Text>
              <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                {request.days} days
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {leaveRequests.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 40 }]}>
            <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No leave requests found
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
              All leave requests will appear here
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Request Details Bottom Sheet */}
      <CustomBottomSheet ref={bottomSheetRef} title="Leave Request Details">
        {selectedRequest && (
          <ScrollView>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700', marginBottom: 8 }]}>
                    {selectedRequest.employeeName}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {selectedRequest.type.charAt(0).toUpperCase() + selectedRequest.type.slice(1)} Leave Request
                  </Text>
                </View>
                <View style={{
                  backgroundColor: getStatusColor(selectedRequest.status),
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}>
                  <Text style={{
                    color: colors.background,
                    fontSize: 14,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}>
                    {selectedRequest.status}
                  </Text>
                </View>
              </View>

              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Text style={commonStyles.textSecondary}>Start Date:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedRequest.startDate}
                </Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Text style={commonStyles.textSecondary}>End Date:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedRequest.endDate}
                </Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Text style={commonStyles.textSecondary}>Total Days:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedRequest.days} days
                </Text>
              </View>

              {selectedRequest.reason && (
                <View style={{ marginBottom: 16 }}>
                  <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Reason:</Text>
                  <Text style={commonStyles.text}>
                    {selectedRequest.reason}
                  </Text>
                </View>
              )}

              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Text style={commonStyles.textSecondary}>Applied Date:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedRequest.appliedDate}
                </Text>
              </View>
            </View>

            {selectedRequest.status === 'pending' && (
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  style={[commonStyles.card, { 
                    flex: 1, 
                    backgroundColor: colors.success,
                    alignItems: 'center',
                    paddingVertical: 16,
                  }]}
                  onPress={() => handleApprove(selectedRequest.id)}
                >
                  <Ionicons name="checkmark" size={20} color={colors.background} />
                  <Text style={[commonStyles.text, { 
                    color: colors.background, 
                    fontWeight: '600',
                    marginTop: 4,
                  }]}>
                    Approve
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[commonStyles.card, { 
                    flex: 1, 
                    backgroundColor: colors.error,
                    alignItems: 'center',
                    paddingVertical: 16,
                  }]}
                  onPress={() => handleReject(selectedRequest.id)}
                >
                  <Ionicons name="close" size={20} color={colors.background} />
                  <Text style={[commonStyles.text, { 
                    color: colors.background, 
                    fontWeight: '600',
                    marginTop: 4,
                  }]}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </CustomBottomSheet>
    </View>
  );
}

export default function LeaveManagement() {
  return (
    <AuthGuard>
      <LeaveManagementContent />
    </AuthGuard>
  );
}
