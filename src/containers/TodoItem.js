import { useContext } from "react";
import TodoContext from "../context/TodoContext";
import cn from "classnames";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  const onDelete = () => {
    dispatch({ type: "DEL", id: todo.id });
  };

  const onDone = () => {
    dispatch({ type: "TOGGLE", id: todo.id });
  };

  return (
    <li className={cn({ completed: todo.done })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.done}
          onChange={onDone}
        />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
}
