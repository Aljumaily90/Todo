import React, { useState } from "react"; 
// Importiert React und den Hook useState, um Zustände in der Komponente zu verwalten.
import MyCalendar from "./Calendar"; 
// Importiert die MyCalendar-Komponente aus der Datei Calendar.js.
import TodoList from "./TodoList"; 
// Importiert die TodoList-Komponente aus der Datei TodoList.js.
function App() {
  const [selectedDate, setSelectedDate] = useState(null); 
  // Verwaltet den Zustand für das aktuell ausgewählte Datum (initial: null).

  const [todosByDate, setTodosByDate] = useState({}); 
  // Verwaltet alle To-Dos nach Datum, gespeichert als ein Objekt (z.B. { "2024-11-12": [...] }).

  const updateTodosForDate = (date, newTodos) => {
    // Funktion, um die To-Dos für ein bestimmtes Datum zu aktualisieren.
    setTodosByDate((prevTodos) => ({
      // Kopiert das vorherige Objekt (prevTodos), um den Zustand nicht direkt zu verändern.
      ...prevTodos, 
      [date]: newTodos, 
      // Überschreibt oder fügt die To-Dos für das gegebene Datum hinzu.
    }));
  };

  return (
    <div className="container">
      {/* Der Hauptcontainer der App */}

      {/* Kalender-Komponente */}
      <MyCalendar onDateChange={setSelectedDate} />
      {/* Übergibt die setSelectedDate-Funktion als Prop, um das ausgewählte Datum zu setzen */}

      <div className="card">
        {/* Container für die To-Do-Liste */}
        {selectedDate ? (
          // Überprüft, ob ein Datum ausgewählt wurde.
          <TodoList
            selectedDate={selectedDate}
            // Übergibt das aktuell ausgewählte Datum als Prop.
            todos={todosByDate[selectedDate.toDateString()] || []}
            // Übergibt die To-Dos für das ausgewählte Datum oder ein leeres Array, falls keine vorhanden sind.
            updateTodos={(newTodos) =>
              updateTodosForDate(selectedDate.toDateString(), newTodos)
            }
            // Übergibt eine Funktion als Prop, um die To-Dos für das ausgewählte Datum zu aktualisieren.
          />
        ) : (
          <p>Bitte wähle ein Datum aus, um die To-Do-Liste anzuzeigen.</p>
          // Zeigt diese Nachricht an, wenn kein Datum ausgewählt wurde.
        )}
      </div>
    </div>
  );
}

export default App; 
// Exportiert die App-Komponente, damit sie in anderen Dateien (z.B. index.js) verwendet werden kann.
