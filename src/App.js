import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import MyCalendar from "./Komponenten/Calendar";
import TodoList from "./Komponenten/TodoList";
import AllTasks from "./Komponenten/AllTasks";
import ToDoTasks from "./Komponenten/ToDoTasks";
import DoneTasks from "./Komponenten/DoneTasks";

function App() {
  const [todosByDate, setTodosByDate] = useState({}); // Zustand für alle To-Dos
  const [selectedDate, setSelectedDate] = useState(null); // Zustand für das ausgewählte Datum

  // Funktion zum Aktualisieren der Aufgaben für ein bestimmtes Datum
  const updateTodosForDate = (date, newTodos) => {
    setTodosByDate((prevTodos) => ({
      ...prevTodos,
      [date]: newTodos,
    }));
  };

  // Funktion zum Abrufen aller Aufgaben
  const getAllTodos = () => {
    const allTodos = [];
    Object.entries(todosByDate).forEach(([date, todos]) => {
      if (Array.isArray(todos)) {
        todos.forEach((todo) => {
          allTodos.push({ ...todo, date });
        });
      }
    });
    return allTodos;
  };

  // Einzelne Aufgabe löschen
  const deleteSingleTodo = (date, index) => {
    setTodosByDate((prevTodos) => {
      const updatedTodos = [...(prevTodos[date] || [])]; // Kopiere die Aufgaben des Datums
      updatedTodos.splice(index, 1); // Entferne die Aufgabe an der gewünschten Position
      return {
        ...prevTodos,
        [date]: updatedTodos,
      };
    });
  };

  // Alle Aufgaben für ein bestimmtes Datum löschen
  const deleteAllTodosForDate = (date) => {
    if (window.confirm("Möchtest du wirklich alle Aufgaben für dieses Datum löschen?")) {
      setTodosByDate((prevTodos) => ({
        ...prevTodos,
        [date]: [],
      }));
    }
  };

  // Alle Aufgaben (global) löschen
  const deleteAllTodos = () => {
    if (window.confirm("Möchtest du wirklich alle Aufgaben löschen?")) {
      setTodosByDate({});
    }
  };

  return (
    <Router>
      <div>
        {/* Horizontale Navigation */}
        <nav className="sidebar">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Startseite
          </NavLink>
          <NavLink
            to="/all"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Alle Aufgaben
          </NavLink>
          <NavLink
            to="/todo"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Zu erledigen
          </NavLink>
          <NavLink
            to="/done"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Erledigt
          </NavLink>
        </nav>

        {/* Hauptinhalt */}
        <div className="container">
          <Routes>
            {/* Startseite */}
            <Route
              path="/"
              element={
                <div className="calendar-container">
                  <MyCalendar onDateChange={(date) => setSelectedDate(date.toDateString())} />
                  {selectedDate ? (
                    <TodoList
                      selectedDate={selectedDate}
                      todos={todosByDate[selectedDate] || []}
                      updateTodos={(newTodos) =>
                        updateTodosForDate(selectedDate, newTodos)
                      }
                      deleteSingleTodo={(index) => deleteSingleTodo(selectedDate, index)}
                      deleteAllTodos={() => deleteAllTodosForDate(selectedDate)}
                    />
                  ) : (
                    <p>Bitte wähle ein Datum aus, um die Aufgaben anzuzeigen.</p>
                  )}
                </div>
              }
            />

            {/* Alle Aufgaben */}
            <Route
              path="/all"
              element={
                <AllTasks
                  todos={getAllTodos()}
                  updateTodos={(updatedTodos) =>
                    setTodosByDate((prevTodos) => {
                      const updatedTodosByDate = { ...prevTodos };
                      updatedTodos.forEach((todo) => {
                        const dateTodos = updatedTodosByDate[todo.date] || [];
                        const todoIndex = dateTodos.findIndex(
                          (t) => t.text === todo.text
                        );
                        if (todoIndex !== -1) {
                          dateTodos[todoIndex] = { ...todo };
                        }
                        updatedTodosByDate[todo.date] = dateTodos;
                      });
                      return updatedTodosByDate;
                    })
                  }
                  deleteSingleTodo={(date, index) => deleteSingleTodo(date, index)}
                  deleteAllTodos={deleteAllTodos}
                />
              }
            />

            {/* Zu erledigen */}
            <Route
              path="/todo"
              element={
                <ToDoTasks
                  todos={getAllTodos().filter((todo) => !todo.completed)}
                  deleteSingleTodo={(date, index) => deleteSingleTodo(date, index)}
                  deleteAllTodos={deleteAllTodos}
                />
              }
            />

            {/* Erledigt */}
            <Route
              path="/done"
              element={
                <DoneTasks
                  todos={getAllTodos().filter((todo) => todo.completed)}
                  deleteSingleTodo={(date, index) => deleteSingleTodo(date, index)}
                  deleteAllTodos={deleteAllTodos}
                />
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
