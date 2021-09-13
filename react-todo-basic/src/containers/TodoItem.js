import { useContext, useRef, useState } from "react";
import TodoContext from "../context/TodoContext";
import cn from "classnames";
import useOnClickOutside from "use-onclickoutside";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  const onDelete = () => {
    dispatch({ type: "DEL", id: todo.id });
  };

  const onDone = () => {
    dispatch({ type: "TOGGLE", id: todo.id });
  };

  const [editing, setEditing] = useState(false);
  const handleViewClick = () => {
    // 双击开启编辑label模式
    setEditing(true);
  };
  const exitEditing = () => {
    // 退出编辑label模式
    setEditing(false);
  };
  const onKeyUp = (event) => {
    // 回车完成编辑
    if (event.key === "Enter") {
      event.preventDefault();
      // 修改
      dispatch({ type: "SET_LABEL", value: event.target.value, id: todo.id });
      // 退出编辑label模式
      exitEditing();
      return;
    }
    // ESC退出编辑
    if (event.key === "Escape") {
      event.preventDefault();
      // 退出编辑label模式
      exitEditing();
      return;
    }
  };
  const ref = useRef();
  // 支持点击输入框之外，退出编辑模式
  useOnClickOutside(ref, exitEditing);

  return (
    <li
      onDoubleClick={handleViewClick}
      className={cn({ completed: todo.done, editing: editing })}
    >
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
      {editing && (
        <input
          ref={ref}
          className="edit"
          defaultValue={todo.label}
          autoFocus={true}
          onKeyUp={onKeyUp}
        />
      )}
    </li>
  );
}
