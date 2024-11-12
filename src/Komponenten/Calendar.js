import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <h3>Wähle ein Datum</h3>
      <div className="card">
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default MyCalendar;
