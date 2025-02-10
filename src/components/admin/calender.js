import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem } from '@mui/material';

const locales = { 'fr': fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    student: '',
    lessonType: '',
    start: '',
    end: '',
  });

  // Fetch students and lessons
  useEffect(() => {
    fetchStudents();
    fetchLessons();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lessons');
      const data = await response.json();
      const formattedEvents = data.map(lesson => ({
        title: `${lesson.student.name} - ${lesson.lessonType}`,
        start: new Date(lesson.start),
        end: new Date(lesson.end),
        lessonType: lesson.lessonType
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lessons/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student: newEvent.student,
          lessonType: newEvent.lessonType,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end)
        })
      });

      if (response.ok) {
        fetchLessons();
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEvent({
      student: '',
      lessonType: '',
      start: '',
      end: '',
    });
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.lessonType === 'Théorie' ? '#FFB6C1' : '#90EE90',
      color: 'black',
      borderRadius: '5px',
      padding: '10px',
      fontWeight: 'bold',
    }
  });

  return (
    <div style={{ height: '100%' }}>
      <h2>Calendrier des Leçons</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button 
          variant="contained" 
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: '#f3be00b2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#f3be00b2',
            }
          }}
        >
          Ajouter une Leçon
        </Button>
      </div>

      <div style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
         
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
          views={['month']}
          defaultView="month"
          toolbar={{
            views: true,
            onNavigate: true,
            onView: true,
            center: 'title',
            right: 'month,week,day'
          }}
        />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une Leçon</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Étudiant"
            fullWidth
            margin="dense"
            name="student"
            value={newEvent.student}
            onChange={handleChange}
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Type de Leçon"
            fullWidth
            margin="dense"
            name="lessonType"
            value={newEvent.lessonType}
            onChange={handleChange}
          >
            <MenuItem value="Théorie">Théorie</MenuItem>
            <MenuItem value="Pratique">Pratique</MenuItem>
          </TextField>

          <TextField
            label="Début"
            type="datetime-local"
            fullWidth
            margin="dense"
            name="start"
            value={newEvent.start}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Fin"
            type="datetime-local"
            fullWidth
            margin="dense"
            name="end"
            value={newEvent.end}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleAddEvent} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarComponent;