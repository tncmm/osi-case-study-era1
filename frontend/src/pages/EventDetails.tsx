import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEvent, addComment, addParticipant, cancelParticipation, deleteEvent } from '../store/slices/eventSlice';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentEvent: event, loading, error } = useAppSelector((state) => state.events);
  const { user } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchEvent(id));
    }
  }, [dispatch, id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    try {
      await dispatch(
        addComment({
          eventId: event!.id,
          content: comment,
          userId: user.userId
        })
      ).unwrap();
      setComment('');
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleParticipate = async () => {
    if (!user || !event) return;

    try {
      await dispatch(
        addParticipant({
          eventId: event.id,
          userId: user.userId
        })
      ).unwrap();
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleCancelParticipation = async () => {
    if (!user || !event) return;

    try {
      await dispatch(cancelParticipation(event.id)).unwrap();
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await dispatch(deleteEvent(event.id)).unwrap();
      navigate('/events');
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const isParticipant = event?.participants?.some(
    (p) => p.userId === user?.userId
  );

  const isOwner = user?.userId === event?.userId;
  const participantCount = event?.participants?.length || 0;

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

  if (!event) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          Event not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.title}
          </Typography>
          {isOwner && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/events/${event.id}/edit`)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
        <Typography color="textSecondary" gutterBottom>
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Location: {event.location}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Participants: {participantCount}
        </Typography>

        {user && !isOwner && (
          <Box sx={{ mt: 2, mb: 4 }}>
            {!isParticipant ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleParticipate}
                disabled={loading}
              >
                Participate in Event
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelParticipation}
                disabled={loading}
              >
                Cancel Participation
              </Button>
            )}
          </Box>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Comments
        </Typography>

        {user && (
          <Box component="form" onSubmit={handleAddComment} sx={{ mb: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!comment.trim() || loading}
            >
              Add Comment
            </Button>
          </Box>
        )}

        <Grid container spacing={2}>
          {event.comments?.map((comment) => (
            <Grid item xs={12} key={comment.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1">{comment.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetails; 