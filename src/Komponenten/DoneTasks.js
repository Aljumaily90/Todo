import React from "react";

const DoneTasks = ({ todos, deleteSingleTodo, deleteAllTodos }) => {
  // Filtere nur die erledigten Aufgaben
  const doneTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <h3>Erledigte Aufgaben</h3>

      {/* Liste der erledigten Aufgaben */}
      <ul>
        {doneTodos.map((todo, index) => (
          <li key={index} style={{ textDecoration: "line-through" }}>
            <span>{todo.text}</span>
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

export default DoneTasks;
