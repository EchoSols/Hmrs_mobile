
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'HR Manager' | 'Employee' | 'Admin' | 'Department Head';
  avatar?: string;
  department: string;
  position: string;
  permissions: Permission[];
}

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar: string;
  hireDate: string;
  salary: number;
  manager: string;
  skills: string[];
  performanceScore: number;
  attendanceRate: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'present' | 'late' | 'absent' | 'half-day' | 'work-from-home';
  location?: string;
  notes?: string;
}

export interface PerformanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  period: string;
  currentScore: number;
  previousScore: number;
  goals: Goal[];
  feedback: string[];
  trend: 'up' | 'down' | 'stable';
  lastReviewDate: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: string;
  progress: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  submittedDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  dueDate: string;
  createdDate: string;
  tags: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  budget: number;
  description: string;
}

export interface Analytics {
  totalEmployees: number;
  activeEmployees: number;
  averagePerformance: number;
  attendanceRate: number;
  satisfactionScore: number;
  turnoverRate: number;
  departmentMetrics: DepartmentMetric[];
  monthlyTrends: MonthlyTrend[];
}

export interface DepartmentMetric {
  department: string;
  employeeCount: number;
  performanceAvg: number;
  attendanceRate: number;
  budget: number;
}

export interface MonthlyTrend {
  month: string;
  employees: number;
  performance: number;
  attendance: number;
  satisfaction: number;
}
