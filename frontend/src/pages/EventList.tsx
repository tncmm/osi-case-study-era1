import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEvents } from '../store/slices/eventSlice';
import { restoreUser } from '../store/slices/authSlice';

const EventList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { events, loading: eventsLoading, error } = useAppSelector((state) => state.events);
  const { user, loading: userLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(restoreUser());
    }
    dispatch(fetchEvents());
  }, [dispatch, user]);

  const loading = eventsLoading || userLoading;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/events/create')}
        >
          Create New Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {event.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {event.location}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Details
                </Button>
                {user && user.userId === event.userId && (
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => navigate(`/events/${event.id}/edit`)}
                  >
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {events.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            No events found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/events/create')}
          >
            Create Your First Event
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default EventList; 