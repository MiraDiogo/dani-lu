export type UserRole = 'client' | 'trainer' | 'physio';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'clothing' | 'accessories';
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  specs: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Anamnesis {
  completed: boolean;
  fullName: string;
  age: number;
  weight: number;
  height: number;
  objective: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  healthConditions: string;
  foodRestrictions: string;
  injuries: string;
  lastUpdated?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
  completed?: boolean;
}

export interface WorkoutDay {
  day: string; // 'Segunda', 'Terça', etc.
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  clientId: string;
  trainerId: string;
  startDate: string;
  endDate: string;
  days: WorkoutDay[];
}

export interface PainReport {
  id: string;
  date: string;
  painLevel: number; // 0 to 10
  description: string;
  bodyParts: string[]; // e.g. ['knee-left', 'shoulder-right']
  status: 'pending' | 'reviewed';
}

export interface RehabExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  instructions: string;
  completed?: boolean;
}

export interface RehabPlan {
  clientId: string;
  physioId: string;
  startDate: string;
  exercises: RehabExercise[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'received' | 'preparing' | 'shipped' | 'delivered';
  shippingAddress: string;
  paymentMethod: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl: string; // Embedded video ID or URL
  category: 'strength' | 'rehab' | 'cardio';
  targetMuscle: string;
  coverImage: string;
}

export interface EducationVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  category: 'nutrition' | 'recovery' | 'breathing' | 'warmup';
  coverImage: string;
}
