import axios, { AxiosError } from 'axios';
import { LoginCredentials, RegisterCredentials, CreateEventData, UpdateUserData } from '../types';

const AUTH_API_URL = 'https://osi-case-study-era1-1-auth.onrender.com';
const EVENT_API_URL = 'https://osi-case-study-era1-1-event.onrender.com';

interface ApiErrorResponse {
  isError: true;
  success: {};
  error: {
    code: number;
    message: string;
  };
}

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

// Request interceptors
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

eventApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Response interceptors
authApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data?.isError) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
);

eventApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data?.isError) {
      throw new Error(error.response.data.error.message);
    }
    throw error;
  }
);

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
  updateProfile: async (userData: UpdateUserData) => {
    const response = await authApi.put('/authentication/update', userData);
    return response.data;
  },
};

// Event Service APIs
export const eventService = {
  getAllEvents: async () => {
    const response = await eventApi.get('/events');
    return response.data.data.events;
  },
  getEvent: async (id: string) => {
    const response = await eventApi.get(`/events/${id}`);
    return response.data.data.event;
  },
  createEvent: async (eventData: CreateEventData) => {
    const response = await eventApi.post('/events/create', eventData);
    return response.data.data.event;
  },
  updateEvent: async (id: string, eventData: Partial<CreateEventData>) => {
    const response = await eventApi.put(`/events/${id}`, eventData);
    return response.data.data.event;
  },
  deleteEvent: async (id: string) => {
    const response = await eventApi.delete(`/events/${id}`);
    return response.data.data;
  },
  addComment: async (eventId: string, content: string, userId: number) => {
    const response = await eventApi.post(`/events/${eventId}/comment`, { content, userId });
    return response.data.data.comment;
  },
  addParticipant: async (eventId: string, userId: number) => {
    const response = await eventApi.post(`/events/${eventId}/participant`, { userId });
    return response.data.data.participant;
  },
  cancelParticipation: async (eventId: string) => {
    const response = await eventApi.delete(`/events/${eventId}/participant`);
    return response.data.data;
  },
}; 