import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Button, Form } from "react-bootstrap";
import { BASE_URL } from "/src/constants/constant.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HolidayCalander.css";

const localizer = momentLocalizer(moment);

const HolidayCalander = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitles, setEditedTitles] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  const userId = localStorage.getItem("userId"); // Get the stored user ID

  useEffect(() => {
    fetchEvents();
  }, [refreshEvents]); // ✅ Runs when refreshEvents changes

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}holidaycalanderload`);
      const data = await response.json();

      const formattedEvents = data.map((event) => ({
        id: event.Id,
        title: event.EventDetails,
        start: new Date(event.EventDate),
        end: new Date(event.EventDate),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSelect = ({ start }) => {
    const formattedDate = moment(start).format("DD-MM-YYYY");
    setSelectedDate(formattedDate);
    const eventsOnDay = events.filter((e) =>
      moment(e.start).isSame(start, "day")
    );
    setSelectedEvents(eventsOnDay);
    setIsEditing(false);
    setIsSaved(false);
    setEditedTitles(eventsOnDay.map((event) => event.title));
    setNewEventTitle("");
    setIsAddingNewEvent(false);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedDate(moment(event.start).format("DD-MM-YYYY"));
    setSelectedEvents([event]);
    setIsEditing(false);
    setIsSaved(false);
    setEditedTitles([event.title]);
    setNewEventTitle("");
    setIsAddingNewEvent(false);
    setShowModal(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedEvents.length) return;

    const formattedDate = moment(selectedDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );

    const updatedEvents = selectedEvents.map((event, index) => ({
      Id: event.id,
      EventDate: formattedDate,
      EventDetails: editedTitles[index],
      CreatedBy: userId || "UnknownUser", // Use userId, fallback if null
    }));

    console.log(
      "📢 Sending Edited Events Data:",
      JSON.stringify(updatedEvents)
    );

    try {
      for (const updatedEvent of updatedEvents) {
        const response = await fetch(`${BASE_URL}holidaycalanderupdate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(updatedEvent),
        });

        const responseText = await response.text();
        console.log("🔍 Raw API Response:", responseText);

        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (error) {
          console.warn(
            "⚠️ Response is not valid JSON. Using raw text instead."
          );
          responseData = responseText;
        }

        if (response.ok) {
          console.log("✅ Successfully updated event:", responseData);
          setEvents(
            events.map((e) =>
              e.id === updatedEvent.Id
                ? { ...e, title: updatedEvent.EventDetails }
                : e
            )
          );
        } else {
          console.error(
            "❌ Failed to save edited event:",
            response.status,
            responseData
          );
        }
      }

      setIsEditing(false);
      setIsSaved(true);
    } catch (error) {
      console.error("⚠️ Error saving edited events:", error);
    }
  };

  const handleAddEvent = async () => {
    if (newEventTitle.trim()) {
      const formattedDate = moment(selectedDate, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );

      const newEvent = {
        EventDate: formattedDate,
        EventDetails: newEventTitle,
        CreatedBy: userId || "UnknownUser", // Use userId, fallback if null
      };

      console.log("📢 Sending New Event Data:", JSON.stringify(newEvent));

      try {
        const response = await fetch(`${BASE_URL}holidaycalanderupdate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newEvent),
        });

        const responseText = await response.text();
        console.log("🔍 Raw API Response:", responseText);

        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (error) {
          console.warn(
            "⚠️ Response is not valid JSON. Using raw text instead."
          );
          responseData = responseText;
        }

        if (response.ok) {
          console.log("✅ Processed API Response:", responseData);

          if (typeof responseData === "object" && responseData !== null) {
            setEvents([
              ...events,
              {
                id: responseData.Id || new Date().getTime(),
                title: responseData.EventDetails || newEventTitle,
                start: new Date(formattedDate),
                end: new Date(formattedDate),
              },
            ]);
          }

          setNewEventTitle("");
          setIsSaved(true);
          setIsEditing(false);
          setIsAddingNewEvent(false);
        } else {
          console.error(
            "❌ Failed to save event:",
            response.status,
            responseData
          );
        }
      } catch (error) {
        console.error("⚠️ Error saving event:", error);
      }
    }
  };

  const handleChangeTitle = (index, value) => {
    const updatedTitles = [...editedTitles];
    updatedTitles[index] = value;
    setEditedTitles(updatedTitles);
  };

  const handleDownloadPDF = () => {
    if (!events || events.length === 0) {
      console.warn("⚠️ No events to download.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const currentYearEvents = events.filter(
      (event) => new Date(event.start).getFullYear() === currentYear
    );

    if (currentYearEvents.length === 0) {
      console.warn("⚠️ No events for the current year to download.");
      return;
    }

    // ✅ Sort events by date
    const sortedEvents = [...currentYearEvents].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    // ✅ Initialize jsPDF
    const doc = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Holiday Calendar", 105, 15, { align: "center" }); // ✅ Updated Title

    // ✅ Table Positioning (Full-Width)
    let marginX = 10; // Left & Right Margin
    let startY = 25;
    let rowHeight = 10;
    let tableWidth = doc.internal.pageSize.width - 2 * marginX;
    let colWidths = [tableWidth * 0.1, tableWidth * 0.3, tableWidth * 0.6]; // 10%, 30%, 60%

    // ✅ Table Headers (Updated to Sl, Date, Event)
    doc.setFontSize(12);
    doc.setFillColor(22, 160, 133); // Green header background
    doc.setTextColor(255); // White text color
    doc.rect(marginX, startY, colWidths[0], rowHeight, "F");
    doc.rect(marginX + colWidths[0], startY, colWidths[1], rowHeight, "F");
    doc.rect(
      marginX + colWidths[0] + colWidths[1],
      startY,
      colWidths[2],
      rowHeight,
      "F"
    );

    doc.text("Sl", marginX + colWidths[0] / 2, startY + rowHeight / 2 + 2, {
      align: "center",
    });
    doc.text(
      "Date",
      marginX + colWidths[0] + colWidths[1] / 2,
      startY + rowHeight / 2 + 2,
      { align: "center" }
    );
    doc.text(
      "Event",
      marginX + colWidths[0] + colWidths[1] + colWidths[2] / 2,
      startY + rowHeight / 2 + 2,
      { align: "center" }
    );

    startY += rowHeight; // Move to first row
    doc.setTextColor(0); // Reset text color

    // ✅ Prepare Data & Handle Rowspan
    let prevDate = null;
    let slNo = 1;
    let rowSpanTracker = {};

    // Count how many events exist per date
    sortedEvents.forEach((event) => {
      const eventDate = moment(event.start).format("YYYY-MM-DD");
      if (!rowSpanTracker[eventDate]) {
        rowSpanTracker[eventDate] = sortedEvents.filter(
          (e) => moment(e.start).format("YYYY-MM-DD") === eventDate
        ).length;
      }
    });

    // ✅ Render Table Rows (Centered Text)
    sortedEvents.forEach((event) => {
      const eventDate = moment(event.start).format("YYYY-MM-DD");
      let currentRowSpan = rowSpanTracker[eventDate];

      if (eventDate !== prevDate) {
        // ✅ Draw Sl No (Centered)
        doc.text(
          String(slNo),
          marginX + colWidths[0] / 2,
          startY + (rowHeight * currentRowSpan) / 2 + 2,
          { align: "center" }
        );
        doc.rect(
          marginX,
          startY,
          colWidths[0],
          rowHeight * currentRowSpan,
          "S"
        );

        // ✅ Draw Event Date (Centered)
        doc.text(
          eventDate,
          marginX + colWidths[0] + colWidths[1] / 2,
          startY + (rowHeight * currentRowSpan) / 2 + 2,
          { align: "center" }
        );
        doc.rect(
          marginX + colWidths[0],
          startY,
          colWidths[1],
          rowHeight * currentRowSpan,
          "S"
        );

        slNo++; // Only increment when a new date appears
      }

      // ✅ Draw Event Title (Centered)
      doc.text(
        event.title,
        marginX + colWidths[0] + colWidths[1] + colWidths[2] / 2,
        startY + rowHeight / 2 + 2,
        { align: "center" }
      );
      doc.rect(
        marginX + colWidths[0] + colWidths[1],
        startY,
        colWidths[2],
        rowHeight,
        "S"
      );

      prevDate = eventDate;
      startY += rowHeight; // Move down a row
    });

    // ✅ Save & Download PDF
    doc.save("Holiday_Calendar.pdf");
    console.log("✅ PDF Downloaded Successfully.");
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
        views={{ month: true }}
        defaultView="month"
        components={{
          toolbar: (props) => (
            <div className="rbc-toolbar">
              <div className="rbc-btn-group">
                <button onClick={() => props.onNavigate("TODAY")}>Today</button>
                <button onClick={() => props.onNavigate("PREV")}>Back</button>
                <button onClick={() => props.onNavigate("NEXT")}>Next</button>
              </div>
              <span className="rbc-toolbar-label">{props.label}</span>
              <div className="rbc-btn-group">
                <button
                  className="custom-right-button"
                  onClick={handleDownloadPDF}
                >
                  Download
                </button>
              </div>
            </div>
          ),
        }}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSaved ? (
            <p>Event saved successfully!</p>
          ) : isAddingNewEvent ? (
            <Form.Control
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Enter new holiday/event title..."
            />
          ) : isEditing ? (
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
          ) : selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => (
              <p key={index}>{event.title}</p>
            ))
          ) : (
            <p>No Event on This Day</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isSaved ? (
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setRefreshEvents((prev) => !prev); // ✅ Toggle state to trigger useEffect
              }}
            >
              OK
            </Button>
          ) : isAddingNewEvent ? (
            <>
              <Button variant="success" onClick={handleAddEvent}>
                Save New Event
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsAddingNewEvent(false)}
              >
                Cancel
              </Button>
            </>
          ) : isEditing ? (
            <>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => setIsAddingNewEvent(true)}
              >
                Add Event
              </Button>
              {selectedEvents.length > 0 && (
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setRefreshEvents((prev) => !prev); // ✅ Toggle state to trigger useEffect
                }}
              >
                OK
              </Button>{" "}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HolidayCalander;
