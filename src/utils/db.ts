import type { Product, User, Anamnesis, WorkoutPlan, PainReport, RehabPlan, Order, CartItem } from '../types';
import { mockProducts, mockUsers, defaultWorkoutPlan, defaultPainReports, defaultRehabPlan } from '../mockData';

export interface ProgressLog {
  date: string;
  weight: number;
  workoutsCompleted: number;
}

const KEYS = {
  PRODUCTS: 'danilu_products',
  USERS: 'danilu_users',
  CURRENT_USER: 'danilu_currentUser',
  ANAMNESIS: 'danilu_anamnesis',
  WORKOUT_PLAN: 'danilu_workoutPlan',
  PAIN_REPORTS: 'danilu_painReports',
  REHAB_PLAN: 'danilu_rehabPlan',
  ORDERS: 'danilu_orders',
  CART: 'danilu_cart',
  PROGRESS: 'danilu_progress'
};

export const initDb = () => {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(mockUsers[0])); // Ana (client) by default
  }
  if (!localStorage.getItem(KEYS.ANAMNESIS)) {
    const emptyAnamnesis: Anamnesis = {
      completed: true, // starts filled out for demo convenience
      fullName: 'Ana Silva',
      age: 26,
      weight: 62,
      height: 1.68,
      objective: 'Hipertrofia e melhora no condicionamento aeróbico',
      activityLevel: 'moderate',
      healthConditions: 'Nenhuma patologia crônica.',
      foodRestrictions: 'Sem restrições graves, evita lactose.',
      injuries: 'Tendinite patelar leve no joelho esquerdo.',
      lastUpdated: '2026-05-10'
    };
    localStorage.setItem(KEYS.ANAMNESIS, JSON.stringify(emptyAnamnesis));
  }
  if (!localStorage.getItem(KEYS.WORKOUT_PLAN)) {
    localStorage.setItem(KEYS.WORKOUT_PLAN, JSON.stringify(defaultWorkoutPlan));
  }
  if (!localStorage.getItem(KEYS.PAIN_REPORTS)) {
    localStorage.setItem(KEYS.PAIN_REPORTS, JSON.stringify(defaultPainReports));
  }
  if (!localStorage.getItem(KEYS.REHAB_PLAN)) {
    localStorage.setItem(KEYS.REHAB_PLAN, JSON.stringify(defaultRehabPlan));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.CART)) {
    localStorage.setItem(KEYS.CART, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.PROGRESS)) {
    const defaultProgress: ProgressLog[] = [
      { date: '2026-05-01', weight: 64.0, workoutsCompleted: 0 },
      { date: '2026-05-05', weight: 63.5, workoutsCompleted: 2 },
      { date: '2026-05-10', weight: 63.1, workoutsCompleted: 5 },
      { date: '2026-05-15', weight: 62.7, workoutsCompleted: 8 },
      { date: '2026-05-20', weight: 62.3, workoutsCompleted: 11 },
      { date: '2026-05-23', weight: 62.0, workoutsCompleted: 13 }
    ];
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(defaultProgress));
  }
};

export const db = {
  getProducts: (): Product[] => {
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
  },
  
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },
  
  getCurrentUser: (): User => {
    return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER) || 'null');
  },
  
  setCurrentUser: (user: User) => {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('storage_user_changed'));
  },
  
  getAnamnesis: (): Anamnesis => {
    return JSON.parse(localStorage.getItem(KEYS.ANAMNESIS) || '{"completed":false}');
  },
  
  saveAnamnesis: (anamnesis: Anamnesis) => {
    localStorage.setItem(KEYS.ANAMNESIS, JSON.stringify({ ...anamnesis, completed: true, lastUpdated: new Date().toISOString().split('T')[0] }));
  },
  
  getWorkoutPlan: (): WorkoutPlan => {
    return JSON.parse(localStorage.getItem(KEYS.WORKOUT_PLAN) || 'null');
  },
  
  saveWorkoutPlan: (plan: WorkoutPlan) => {
    localStorage.setItem(KEYS.WORKOUT_PLAN, JSON.stringify(plan));
  },
  
  getPainReports: (): PainReport[] => {
    return JSON.parse(localStorage.getItem(KEYS.PAIN_REPORTS) || '[]');
  },
  
  addPainReport: (report: Omit<PainReport, 'id' | 'date' | 'status'>) => {
    const reports = db.getPainReports();
    const newReport: PainReport = {
      ...report,
      id: 'pain-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    reports.push(newReport);
    localStorage.setItem(KEYS.PAIN_REPORTS, JSON.stringify(reports));
    return newReport;
  },
  
  updatePainReportStatus: (id: string, status: 'pending' | 'reviewed') => {
    const reports = db.getPainReports();
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
      reports[index].status = status;
      localStorage.setItem(KEYS.PAIN_REPORTS, JSON.stringify(reports));
    }
  },
  
  getRehabPlan: (): RehabPlan => {
    return JSON.parse(localStorage.getItem(KEYS.REHAB_PLAN) || 'null');
  },
  
  saveRehabPlan: (plan: RehabPlan) => {
    localStorage.setItem(KEYS.REHAB_PLAN, JSON.stringify(plan));
  },
  
  getOrders: (): Order[] => {
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
  },
  
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    const orders = db.getOrders();
    const newOrder: Order = {
      ...order,
      id: 'DL-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().split('T')[0],
      status: 'received'
    };
    orders.push(newOrder);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },
  
  updateOrderStatus: (id: string, status: Order['status']) => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    }
  },
  
  getCart: (): CartItem[] => {
    return JSON.parse(localStorage.getItem(KEYS.CART) || '[]');
  },
  
  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  },
  
  getProgress: (): ProgressLog[] => {
    return JSON.parse(localStorage.getItem(KEYS.PROGRESS) || '[]');
  },
  
  logProgress: (weight: number, incrementWorkout: boolean = false) => {
    const logs = db.getProgress();
    const lastLog = logs[logs.length - 1];
    const today = new Date().toISOString().split('T')[0];
    
    let workoutsCompleted = lastLog ? lastLog.workoutsCompleted : 0;
    if (incrementWorkout) {
      workoutsCompleted += 1;
    }
    
    // If log today exists, update it, otherwise create new
    const todayIndex = logs.findIndex(l => l.date === today);
    if (todayIndex !== -1) {
      logs[todayIndex].weight = weight;
      logs[todayIndex].workoutsCompleted = workoutsCompleted;
    } else {
      logs.push({
        date: today,
        weight,
        workoutsCompleted
      });
    }
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(logs));
  }
};
