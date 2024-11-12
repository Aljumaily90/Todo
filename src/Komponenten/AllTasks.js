import React from "react";

const AllTasks = ({ todos, updateTodos, deleteSingleTodo, deleteAllTodos }) => {
  // Funktion, um den Erledigt-Status umzuschalten
  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        // Kehrt den `completed`-Status der geklickten Aufgabe um
        return { ...todo, completed: !todo.completed };
      }
      return todo; // Belässt die anderen Aufgaben unverändert
    });

    // Aktualisiert nur die spezifische Aufgabenliste
    updateTodos(updatedTodos);
  };

  return (
    <div>
      <h3>Alle Aufgaben</h3>

      {/* Liste der Aufgaben */}
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#888" : "#000",
              cursor: "pointer",
            }}
          >
            {/* Klickbare Aufgabe, um den Status umzuschalten */}
            <span onClick={() => toggleComplete(index)}>{todo.text}</span>
            {/* Button zum Löschen einer einzelnen Aufgabe */}
            <button
              onClick={() => deleteSingleTodo(todo.date, index)}
              className="delete-btn"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default AllTasks;
