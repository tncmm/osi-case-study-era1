import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services/api';
import { Event, CreateEventData, UpdateEventData } from '../../types';

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async () => {
    return await eventService.getAllEvents();
  }
);

export const fetchEvent = createAsyncThunk(
  'events/fetchOne',
  async (id: string) => {
    return await eventService.getEvent(id);
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData: CreateEventData) => {
    return await eventService.createEvent(eventData);
  }
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ id, eventData }: { id: string; eventData: Partial<CreateEventData> }) => {
    const updateData = { id, ...eventData } as UpdateEventData;
    return await eventService.updateEvent(id, updateData);
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id: string) => {
    await eventService.deleteEvent(id);
    return id;
  }
);

export const addComment = createAsyncThunk(
  'events/addComment',
  async ({ eventId, content, userId }: { eventId: string; content: string; userId: number }) => {
    return await eventService.addComment(eventId, content, userId);
  }
);

export const addParticipant = createAsyncThunk(
  'events/addParticipant',
  async ({ eventId, userId }: { eventId: string; userId: number }) => {
    return await eventService.addParticipant(eventId, userId);
  }
);

export const cancelParticipation = createAsyncThunk(
  'events/cancelParticipation',
  async (eventId: string, { getState }) => {
    const state = getState() as any;
    const userId = state.auth.user.userId;
    await eventService.cancelParticipation(eventId);
    return { eventId, userId };
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload);
        if (state.currentEvent?.id === action.payload) {
          state.currentEvent = null;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentEvent) {
          state.currentEvent.comments = [...(state.currentEvent.comments || []), action.payload];
        }
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        if (state.currentEvent) {
          state.currentEvent.participants = [...(state.currentEvent.participants || []), action.payload];
        }
      })
      .addCase(cancelParticipation.fulfilled, (state, action) => {
        if (state.currentEvent && state.currentEvent.participants) {
          state.currentEvent.participants = state.currentEvent.participants.filter(
            p => p.userId !== action.payload.userId
          );
        }
      });
  },
});

export const { clearCurrentEvent, clearError } = eventSlice.actions;
export default eventSlice.reducer; 