import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEvent, updateEvent } from '../store/slices/eventSlice';

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentEvent: event, loading, error } = useAppSelector((state) => state.events);
  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEvent(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date),
        location: event.location,
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setFormData((prev) => ({
        ...prev,
        date: newDate,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;

    try {
      await dispatch(updateEvent({ id, eventData: formData })).unwrap();
      navigate(`/events/${id}`);
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          Event not found
        </Alert>
      </Container>
    );
  }

  // Check if the current user is the owner
  if (user?.userId !== event.userId) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          You don't have permission to edit this event
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Edit Event
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Event Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <DateTimePicker
            label="Event Date and Time"
            value={formData.date}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Event Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate(`/events/${id}`)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditEvent; 