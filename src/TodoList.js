import React, { useState } from "react";

const TodoList = ({ selectedDate, todos, updateTodos }) => {
  const [newTodo, setNewTodo] = useState("");
  const [notification, setNotification] = useState(""); // Zustand für Benachrichtigungen

  // Aufgabe hinzufügen
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    updateTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
    showNotification("Aufgabe hinzugefügt! 🎉");
  };

  // Aufgabe als erledigt markieren
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(updatedTodos);
    showNotification(
      updatedTodos[index].completed
        ? "Aufgabe als erledigt markiert! ✅"
        : "Aufgabe wieder geöffnet! 🔄"
    );
  };

  // Aufgabe löschen
  const deleteTodo = (index) => {
    const confirmDelete = window.confirm("Möchtest du diese Aufgabe wirklich löschen?");
    if (confirmDelete) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      updateTodos(updatedTodos);
      showNotification("Aufgabe gelöscht! 🗑️");
    }
  };

  // Alle Aufgaben löschen mit Bestätigung
  const deleteAllTodos = () => {
    const confirmDelete = window.confirm(
      "Möchtest du wirklich alle Aufgaben für diesen Tag löschen?"
    );
    if (confirmDelete) {
      updateTodos([]);
      showNotification("Alle Aufgaben gelöscht! 🗑️");
    }
  };

  // Benachrichtigung anzeigen
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000); // Benachrichtigung nach 2 Sekunden ausblenden
  };

  return (
    <div>
      {/* Liste der Aufgaben */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed-task" : ""}>
            <span onClick={() => toggleComplete(index)}>{todo.text}</span>
            <button onClick={() => deleteTodo(index)}>🗑️</button>
          </li>
        ))}
      </ul>

      {/* Benachrichtigung */}
      {notification && <div className="notification">{notification}</div>}

      {/* Eingabefeld und Button in einer Zeile */}
      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neue Aufgabe hinzufügen"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          +
        </button>
      </div>

      {/* Alle Aufgaben löschen */}
      <div>
        <button onClick={deleteAllTodos} className="delete-all-btn">
          Alle Aufgaben löschen
        </button>
      </div>
    </div>
  );
};


export default TodoList;
