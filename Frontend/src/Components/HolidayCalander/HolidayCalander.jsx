import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HolidayCalander.css';

const localizer = momentLocalizer(moment);

const HolidayCalander = () => {
  const [events, setEvents] = useState([
    {
      title: 'New Year Holiday',
      start: new Date(2025, 0, 1),
      end: new Date(2025, 0, 1),
    },
    {
      title: 'Christmas',
      start: new Date(2025, 11, 25),
      end: new Date(2025, 11, 25),
    },
    {
      title: 'Boxing Day',
      start: new Date(2025, 11, 25),
      end: new Date(2025, 11, 25),
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitles, setEditedTitles] = useState([]); // Track edited titles for multiple events
  const [newEventTitle, setNewEventTitle] = useState(''); // Track new event title
  const [isSaved, setIsSaved] = useState(false);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false); // Manage add new event state

  const handleSelect = ({ start }) => {
    const formattedDate = moment(start).format('DD-MM-YYYY');
    setSelectedDate(formattedDate);
    const eventsOnDay = events.filter(e => moment(e.start).isSame(start, 'day'));
    setSelectedEvents(eventsOnDay);
    setIsEditing(false);
    setIsSaved(false);
    setEditedTitles(eventsOnDay.map(event => event.title)); // Initialize edited titles
    setNewEventTitle(''); // Clear new event title
    setIsAddingNewEvent(false); // Reset adding new event
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedDate(moment(event.start).format('DD-MM-YYYY'));
    setSelectedEvents([event]); // Only show the clicked event in the modal
    setIsEditing(false);
    setIsSaved(false);
    setEditedTitles([event.title]); // Initialize edited title for the clicked event
    setNewEventTitle(''); // Clear new event title
    setIsAddingNewEvent(false); // Reset adding new event
    setShowModal(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsSaved(true);
    setEvents(events.map((e, index) => 
      moment(e.start).isSame(selectedDate, 'day')
        ? { ...e, title: editedTitles[index] }
        : e
    ));
  };

  const handleAddEvent = () => {
    if (newEventTitle.trim()) {
      const newEvent = {
        title: newEventTitle,
        start: new Date(selectedDate), // Set the start date to the selected date
        end: new Date(selectedDate),   // Set the end date to the same as start date
      };
      setEvents([...events, newEvent]);
      setNewEventTitle(''); // Clear the input field after adding
      setIsSaved(true);
      setIsEditing(false);
      setIsAddingNewEvent(false); // Stop adding new event
    }
  };

  const handleChangeTitle = (index, value) => {
    const updatedTitles = [...editedTitles];
    updatedTitles[index] = value;
    setEditedTitles(updatedTitles);
  };

  return (
    <div className="calendar-container">
      <h2>Holiday Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="holiday-calendar"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
        views={{ month: true }} // Only show Month view
        defaultView="month" // Default view is Month
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSaved ? (
            <p>Event saved successfully!</p>
          ) : isAddingNewEvent ? (
            // Display the input field for adding a new event
            <Form.Control
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Enter new holiday/event title..."
            />
          ) : isEditing ? (
            // Display the input fields for editing multiple events
            selectedEvents.map((event, index) => (
              <Form.Control
                key={index}
                type="text"
                value={editedTitles[index]}
                onChange={(e) => handleChangeTitle(index, e.target.value)}
                placeholder="Enter event title..."
                className="mb-2"
              />
            ))
          ) : (
            // Display all event titles if no edit or add is active
            selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <p key={index}>{event.title}</p>
              ))
            ) : (
              <p>No Event on This Day</p>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          {isSaved ? (
            <Button variant="secondary" onClick={() => setShowModal(false)}>OK</Button>
          ) : isAddingNewEvent ? (
            <>
              <Button variant="success" onClick={handleAddEvent}>Save New Event</Button>
              <Button variant="secondary" onClick={() => setIsAddingNewEvent(false)}>Cancel</Button>
            </>
          ) : isEditing ? (
            <>
              <Button variant="success" onClick={handleSave}>Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={() => setIsAddingNewEvent(true)}>
                Add Event
              </Button>
              {selectedEvents.length > 0 && (
                <Button variant="primary" onClick={handleEdit}>Edit</Button>
              )}
              <Button variant="secondary" onClick={() => setShowModal(false)}>OK</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HolidayCalander;
