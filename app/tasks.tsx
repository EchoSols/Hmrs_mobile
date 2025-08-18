
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import { useTasks } from '../hooks/useData';
import AuthGuard from '../components/AuthGuard';
import { Task } from '../types';
import ProgressRing from '../components/ProgressRing';
import BottomSheet from '@gorhom/bottom-sheet';
import { useState, useRef } from 'react';
import CustomBottomSheet from '../components/BottomSheet';

function TaskManagementContent() {
  const { tasks, loading } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  console.log('Task Management screen loaded with', tasks.length, 'tasks');

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading tasks...</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'in-progress': return colors.primary;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'completed': return 100;
      case 'in-progress': return 60;
      case 'pending': return 20;
      case 'overdue': return 80;
      default: return 0;
    }
  };

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    bottomSheetRef.current?.expand();
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    console.log('Updating task status:', taskId, newStatus);
    // This would typically call an API to update the task status
    bottomSheetRef.current?.close();
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const overdueTasks = tasks.filter(task => task.status === 'overdue');

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
            <Text style={commonStyles.title}>Task Management</Text>
            <Text style={commonStyles.subtitle}>
              {tasks.filter(task => task.status !== 'completed').length} active tasks
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
        {/* Task Stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, marginBottom: 20 }}>
          <View style={[commonStyles.card, { width: '47%', marginRight: '6%', marginBottom: 16 }]}>
            <Text style={commonStyles.metric}>{pendingTasks.length}</Text>
            <Text style={commonStyles.metricLabel}>Pending</Text>
          </View>
          <View style={[commonStyles.card, { width: '47%', marginBottom: 16 }]}>
            <Text style={commonStyles.metric}>{inProgressTasks.length}</Text>
            <Text style={commonStyles.metricLabel}>In Progress</Text>
          </View>
          <View style={[commonStyles.card, { width: '47%', marginRight: '6%' }]}>
            <Text style={commonStyles.metric}>{completedTasks.length}</Text>
            <Text style={commonStyles.metricLabel}>Completed</Text>
          </View>
          <View style={[commonStyles.card, { width: '47%' }]}>
            <Text style={commonStyles.metric}>{overdueTasks.length}</Text>
            <Text style={commonStyles.metricLabel}>Overdue</Text>
          </View>
        </View>

        {/* Priority Tasks */}
        {tasks.filter(task => task.priority === 'high' && task.status !== 'completed').length > 0 && (
          <>
            <Text style={commonStyles.sectionTitle}>High Priority Tasks</Text>
            {tasks
              .filter(task => task.priority === 'high' && task.status !== 'completed')
              .map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={commonStyles.card}
                  onPress={() => openTaskDetails(task)}
                >
                  <View style={[commonStyles.row, { marginBottom: 12 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                        {task.title}
                      </Text>
                      <Text style={commonStyles.textSecondary}>
                        Assigned to: {task.assignedTo}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <View style={{
                        backgroundColor: getPriorityColor(task.priority),
                        borderRadius: 12,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        marginBottom: 8,
                      }}>
                        <Text style={{
                          color: colors.background,
                          fontSize: 12,
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}>
                          {task.priority}
                        </Text>
                      </View>
                      <ProgressRing 
                        progress={getStatusProgress(task.status)} 
                        size={40} 
                        strokeWidth={3}
                        color={getStatusColor(task.status)}
                        showText={false}
                      />
                    </View>
                  </View>
                  
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Text style={commonStyles.textSecondary}>Due Date:</Text>
                    <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                      {task.dueDate}
                    </Text>
                  </View>
                  
                  <View style={commonStyles.row}>
                    <Text style={commonStyles.textSecondary}>Status:</Text>
                    <View style={{
                      backgroundColor: getStatusColor(task.status),
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
                        {task.status.replace('-', ' ')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </>
        )}

        {/* All Tasks */}
        <Text style={commonStyles.sectionTitle}>All Tasks</Text>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={commonStyles.card}
            onPress={() => openTaskDetails(task)}
          >
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {task.title}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Assigned to: {task.assignedTo}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{
                  backgroundColor: getPriorityColor(task.priority),
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginBottom: 8,
                }}>
                  <Text style={{
                    color: colors.background,
                    fontSize: 12,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}>
                    {task.priority}
                  </Text>
                </View>
                <ProgressRing 
                  progress={getStatusProgress(task.status)} 
                  size={40} 
                  strokeWidth={3}
                  color={getStatusColor(task.status)}
                  showText={false}
                />
              </View>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Text style={commonStyles.textSecondary}>Due Date:</Text>
              <Text style={[commonStyles.text, { fontWeight: '500' }]}>
                {task.dueDate}
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <Text style={commonStyles.textSecondary}>Status:</Text>
              <View style={{
                backgroundColor: getStatusColor(task.status),
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
                  {task.status.replace('-', ' ')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {tasks.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 40 }]}>
            <Ionicons name="list-outline" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
              No tasks found
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
              All tasks will appear here
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Task Details Bottom Sheet */}
      <CustomBottomSheet ref={bottomSheetRef} title="Task Details">
        {selectedTask && (
          <ScrollView>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700', marginBottom: 16 }]}>
                {selectedTask.title}
              </Text>

              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Text style={commonStyles.textSecondary}>Assigned to:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedTask.assignedTo}
                </Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Text style={commonStyles.textSecondary}>Due Date:</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {selectedTask.dueDate}
                </Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Text style={commonStyles.textSecondary}>Priority:</Text>
                <View style={{
                  backgroundColor: getPriorityColor(selectedTask.priority),
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
                    {selectedTask.priority}
                  </Text>
                </View>
              </View>

              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Text style={commonStyles.textSecondary}>Status:</Text>
                <View style={{
                  backgroundColor: getStatusColor(selectedTask.status),
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
                    {selectedTask.status.replace('-', ' ')}
                  </Text>
                </View>
              </View>

              {selectedTask.description && (
                <View style={{ marginBottom: 16 }}>
                  <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Description:</Text>
                  <Text style={commonStyles.text}>
                    {selectedTask.description}
                  </Text>
                </View>
              )}

              <View style={{ marginBottom: 16 }}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Progress:</Text>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <ProgressRing 
                    progress={getStatusProgress(selectedTask.status)} 
                    size={60} 
                    strokeWidth={4}
                    color={getStatusColor(selectedTask.status)}
                    text={`${getStatusProgress(selectedTask.status)}%`}
                  />
                  <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '600' }]}>
                    {getStatusProgress(selectedTask.status)}% Complete
                  </Text>
                </View>
              </View>
            </View>

            {selectedTask.status !== 'completed' && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {selectedTask.status === 'pending' && (
                  <TouchableOpacity
                    style={[commonStyles.card, { 
                      flex: 1, 
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      paddingVertical: 12,
                      minWidth: '45%',
                    }]}
                    onPress={() => updateTaskStatus(selectedTask.id, 'in-progress')}
                  >
                    <Text style={[commonStyles.text, { 
                      color: colors.background, 
                      fontWeight: '600',
                    }]}>
                      Start Task
                    </Text>
                  </TouchableOpacity>
                )}

                {selectedTask.status === 'in-progress' && (
                  <TouchableOpacity
                    style={[commonStyles.card, { 
                      flex: 1, 
                      backgroundColor: colors.success,
                      alignItems: 'center',
                      paddingVertical: 12,
                      minWidth: '45%',
                    }]}
                    onPress={() => updateTaskStatus(selectedTask.id, 'completed')}
                  >
                    <Text style={[commonStyles.text, { 
                      color: colors.background, 
                      fontWeight: '600',
                    }]}>
                      Complete Task
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[commonStyles.card, { 
                    flex: 1, 
                    backgroundColor: colors.backgroundAlt,
                    alignItems: 'center',
                    paddingVertical: 12,
                    minWidth: '45%',
                  }]}
                >
                  <Text style={[commonStyles.text, { 
                    color: colors.text, 
                    fontWeight: '600',
                  }]}>
                    Edit Task
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

export default function TaskManagement() {
  return (
    <AuthGuard>
      <TaskManagementContent />
    </AuthGuard>
  );
}
