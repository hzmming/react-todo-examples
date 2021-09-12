import { useContext } from "react";
import TodoContext from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  const onDelete = () => {
    dispatch({ type: "DEL", id: todo.id });
  };

  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
}
