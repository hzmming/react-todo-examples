import TodoItem from "./TodoItem";
import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter";
import TodoContext from "../context/TodoContext";
import useTodos from "../reducers/useTodos";

export default function TodoList() {
  const [newValue, onNewValueChange, setNewValue] = useInput();

  const onAddTodo = useOnEnter(() => {
    if (newValue) {
      dispatch({ type: "ADD", label: newValue });
      setNewValue("");
    }
  }, [newValue]);

  const [todos, dispatch] = useTodos();

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newValue}
            onKeyPress={onAddTodo}
            onChange={onNewValueChange}
          />
        </header>

        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      </div>
    </TodoContext.Provider>
  );
}
