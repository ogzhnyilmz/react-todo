import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditing(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditing(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 md:px-10 lg:px-20" style={{ backgroundImage: "url('/bg-image.jpg')" }}>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl p-4 bg-gray-100 bg-opacity-90 rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold text-center mb-4">Todo React</h1>
        <div className="flex flex-col sm:flex-row mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2 sm:mb-0 sm:mr-2"
            placeholder="Yeni bir todo ekleyin..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            onClick={addTodo}
          >
            Ekle
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <button onClick={() => setFilter("all")} className="px-4 py-2 bg-gray-300 rounded-lg mb-2 sm:mb-0">Tümü</button>
          <button onClick={() => setFilter("completed")} className="px-4 py-2 bg-green-300 rounded-lg mb-2 sm:mb-0">Tamamlananlar</button>
          <button onClick={() => setFilter("active")} className="px-4 py-2 bg-red-300 rounded-lg">Tamamlanmayanlar</button>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex flex-col sm:flex-row justify-between items-center bg-white p-2 my-2 rounded-lg shadow">
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="mr-2"
                />
                {editing === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 border p-1 rounded-lg"
                  />
                ) : (
                  <span
                    className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
                    onDoubleClick={() => startEditing(todo.id, todo.text)}
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="flex mt-2 sm:mt-0">
                {editing === todo.id ? (
                  <button onClick={() => saveEdit(todo.id)} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg">Kaydet</button>
                ) : (
                  <button onClick={() => deleteTodo(todo.id)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg">Sil</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
