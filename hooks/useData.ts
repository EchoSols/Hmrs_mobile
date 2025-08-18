
import { useState, useEffect } from 'react';
import { 
  Employee, 
  AttendanceRecord, 
  PerformanceRecord, 
  LeaveRequest, 
  Task, 
  Department, 
  Analytics 
} from '../types';
import { 
  mockEmployees, 
  mockAttendance, 
  mockPerformance, 
  mockLeaveRequests, 
  mockTasks, 
  mockDepartments, 
  mockAnalytics 
} from '../data/mockData';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 500);
  }, []);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Date.now().toString() };
    setEmployees(prev => [...prev, newEmployee]);
    console.log('Employee added:', newEmployee.name);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
    console.log('Employee updated:', id);
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    console.log('Employee deleted:', id);
  };

  return { employees, loading, addEmployee, updateEmployee, deleteEmployee };
}

export function useAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAttendance(mockAttendance);
      setLoading(false);
    }, 500);
  }, []);

  const markAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setAttendance(prev => [...prev, newRecord]);
    console.log('Attendance marked:', newRecord.employeeName);
  };

  return { attendance, loading, markAttendance };
}

export function usePerformance() {
  const [performance, setPerformance] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPerformance(mockPerformance);
      setLoading(false);
    }, 500);
  }, []);

  const updatePerformance = (id: string, updates: Partial<PerformanceRecord>) => {
    setPerformance(prev => prev.map(perf => perf.id === id ? { ...perf, ...updates } : perf));
    console.log('Performance updated:', id);
  };

  return { performance, loading, updatePerformance };
}

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLeaveRequests(mockLeaveRequests);
      setLoading(false);
    }, 500);
  }, []);

  const submitLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'submittedDate' | 'status'>) => {
    const newRequest = { 
      ...request, 
      id: Date.now().toString(),
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const
    };
    setLeaveRequests(prev => [...prev, newRequest]);
    console.log('Leave request submitted:', newRequest.employeeName);
  };

  const approveLeaveRequest = (id: string, approvedBy: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' as const, approvedBy } : req
    ));
    console.log('Leave request approved:', id);
  };

  const rejectLeaveRequest = (id: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
    console.log('Leave request rejected:', id);
  };

  return { leaveRequests, loading, submitLeaveRequest, approveLeaveRequest, rejectLeaveRequest };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 500);
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdDate'>) => {
    const newTask = { 
      ...task, 
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, newTask]);
    console.log('Task added:', newTask.title);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
    console.log('Task updated:', id);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    console.log('Task deleted:', id);
  };

  return { tasks, loading, addTask, updateTask, deleteTask };
}

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
    }, 500);
  }, []);

  return { departments, loading };
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 500);
  }, []);

  return { analytics, loading };
}
