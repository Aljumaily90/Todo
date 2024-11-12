import React from "react";

const ToDoTasks = ({ todos, deleteSingleTodo, deleteAllTodos }) => {
  // Filtere nur die Aufgaben, die nicht erledigt sind
  const openTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h3>Zu erledigen</h3>

      {/* Liste der offenen Aufgaben */}
      <ul>
        {openTodos.map((todo, index) => (
          <li key={index}>
            <span>{todo.text}</span>
            {/* Button zum Löschen einer einzelnen Aufgabe */}
            <button onClick={() => deleteSingleTodo(todo.date, index)} className="delete-btn">
              🗑️
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ToDoTasks;
