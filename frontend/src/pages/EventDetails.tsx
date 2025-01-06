import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchEvent,
  addComment,
  addParticipant,
  deleteEvent,
} from '../store/slices/eventSlice';

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

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    try {
      await dispatch(
        addComment({
          eventId: event.id,
          content: comment,
          userId: user.userId
        })
      ).unwrap();
      setComment('');
    } catch (err) {
    }
  };

  const handleParticipate = async () => {
    if (!user) return;

    try {
      await dispatch(
        addParticipant({
          eventId: event.id,
          userId: user.userId,
        })
      ).unwrap();
    } catch (err) {
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await dispatch(deleteEvent(event.id)).unwrap();
        navigate('/events');
      } catch (err) {
      }
    }
  };

  const isOwner = user?.userId === event.userId;
  const isParticipant = event.participants?.includes(user?.userId || 0);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            {event.title}
          </Typography>
          {isOwner && (
            <Box>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate(`/events/${event.id}/edit`)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button color="error" variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </Box>

        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Date: {new Date(event.date).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Location: {event.location}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Participants
          </Typography>
          {!isParticipant && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleParticipate}
              sx={{ mb: 2 }}
            >
              Join Event
            </Button>
          )}
          <List>
            {event.participants?.map((participantId) => (
              <ListItem key={participantId}>
                <ListItemText primary={`Participant ${participantId}`} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <Box component="form" onSubmit={handleAddComment} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!comment.trim()}
            >
              Add Comment
            </Button>
          </Box>

          <List>
            {event.comments?.map((comment) => (
              <ListItem key={comment.id} disablePadding>
                <Card sx={{ width: '100%', mb: 1 }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      User {comment.userId}
                    </Typography>
                    <Typography variant="body1">
                      {comment.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventDetails; 