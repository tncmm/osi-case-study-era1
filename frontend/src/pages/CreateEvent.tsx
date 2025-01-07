import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createEvent } from '../store/slices/eventSlice';

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.events);
  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
  });

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
    if (!user){
        console.log("User not found");
        return;
    } 

    try {
      const eventData = {
        ...formData,
        userId: user.userId
        
      };
      await dispatch(createEvent(eventData)).unwrap();
      navigate('/events');
    } catch (err) {
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Create New Event
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
            autoFocus
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
              onClick={handleSubmit}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/events')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent; 