import { useMemo } from "react";
import TodoItem from "./TodoItem";
import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter";
import TodoContext from "../context/TodoContext";
import useTodos from "../reducers/useTodos";
import { NavLink, useParams } from "react-router-dom";

export default function TodoList() {
  const [newValue, onNewValueChange, setNewValue] = useInput();

  const onAddTodo = useOnEnter(() => {
    if (newValue) {
      dispatch({ type: "ADD", label: newValue });
      setNewValue("");
    }
  }, [newValue]);

  const [todos, dispatch] = useTodos();

  const { filter } = useParams();
  // 不是很确定这个useMemo有没有必要，因为看着所有的操作，都会造成这个visibleTodos变化。。。
  const visibleTodos = useMemo(() => {
    return filter
      ? todos.filter((i) => (filter === "active" ? !i.done : i.done))
      : todos;
  }, [todos, filter]);

  // 剩余未完成任务个数
  const left = useMemo(() => todos.reduce((a, b) => a + (b.done ? 0 : 1), 0), [
    todos,
  ]);

  const anyDone = useMemo(() => todos.some((i) => i.done), [todos]);

  const onClearCompleted = () => {
    dispatch({ type: "TOGGLE_ALL", value: false });
  };

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
            {visibleTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{left}</strong> items left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact={true} to="/" activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          {anyDone && (
            <button className="clear-completed" onClick={onClearCompleted}>
              Clear completed
            </button>
          )}
        </footer>
      </div>
    </TodoContext.Provider>
  );
}
