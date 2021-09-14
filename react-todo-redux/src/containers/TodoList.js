import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter";
import { selectTodos, add, toggle, toggleAll } from "../store/todos/todosSlice";
import { NavLink, useParams } from "react-router-dom";

export default function TodoList() {
  const [newValue, onNewValueChange, setNewValue] = useInput();

  const onAddTodo = useOnEnter(() => {
    if (newValue) {
      dispatch(add(newValue));
      setNewValue("");
    }
  }, [newValue]);

  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

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

  // 当前过滤任务，是否全部已完成
  const allSelected = useMemo(() => visibleTodos.every((i) => i.done), [
    visibleTodos,
  ]);
  // 全部完成或重置
  const onToggleAll = () => {
    visibleTodos.forEach((i) => {
      dispatch(toggle({ id: i.id, value: !allSelected }));
    });
  };

  // 清除已完成
  const anyDone = useMemo(() => todos.some((i) => i.done), [todos]);
  const onClearCompleted = () => {
    dispatch(toggleAll(false));
  };

  return (
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
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
        />
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
  );
}
