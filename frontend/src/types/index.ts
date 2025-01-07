export interface User {
  userId: number;
  email: string;
  phone: string;
  name: string;
  surname: string;
  token: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: number;
  participants?: Participant[];
  comments?: Comment[];
}

export interface Participant {
  id: string;
  eventId: string;
  userId: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  eventId: string;
  userId: number;
  content: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    surname: string;
    email: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CreateEventData {
    
  title: string;
  description: string;
  date: Date;
  location: string;
  userId: number;
}

export interface UpdateEventData extends CreateEventData {
  id: string;
} 