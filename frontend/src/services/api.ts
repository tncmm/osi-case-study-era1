import axios from 'axios';
import { LoginCredentials, RegisterCredentials, CreateEventData } from '../types';

const AUTH_API_URL = 'http://localhost:3001';
const EVENT_API_URL = 'http://localhost:3002';

const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

const eventApi = axios.create({
  baseURL: EVENT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
  withCredentials: true
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `x-auth-key ${token}`;
  }
  return config;
});

eventApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `x-auth-key ${token}`;
  }
  return config;
});

// Auth Service APIs
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await authApi.post('/authentication/login', credentials);
    return response.data;
  },
  register: async (userData: RegisterCredentials) => {
    const response = await authApi.post('/authentication/register', userData);
    return response.data;
  },
};

// Event Service APIs
export const eventService = {
  getAllEvents: async () => {
    const response = await eventApi.get('/events');
    return response.data.events;
  },
  getEvent: async (id: string) => {
    const response = await eventApi.get(`/events/${id}`);
    return response.data.event;
  },
  createEvent: async (eventData: CreateEventData) => {
    const response = await eventApi.post('/events/create', eventData);
    return response.data.event;
  },
  updateEvent: async (id: string, eventData: Partial<CreateEventData>) => {
    const response = await eventApi.put(`/events/${id}`, eventData);
    return response.data.event;
  },
  deleteEvent: async (id: string) => {
    const response = await eventApi.delete(`/events/${id}`);
    return response.data;
  },
  addComment: async (eventId: string, content: string, userId: number) => {
    const response = await eventApi.post(`/events/${eventId}/comment`, { content, userId });
    return response.data.comment;
  },
  addParticipant: async (eventId: string, userId: number) => {
    const response = await eventApi.post(`/events/${eventId}/participant`, { userId });
    return response.data.participant;
  },
}; 