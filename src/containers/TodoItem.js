import { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import cn from "classnames";
import useOnEnter from "../hooks/useOnEnter";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  const onDelete = () => {
    dispatch({ type: "DEL", id: todo.id });
  };

  const onDone = () => {
    dispatch({ type: "TOGGLE", id: todo.id });
  };

  const [editing, setEditing] = useState(false);
  // TODO input应该自动获取焦点
  const handleViewClick = () => {
    // 双击开启编辑label模式
    setEditing(true);
  };
  const onChange = (event) => {
    dispatch({ type: "SET_LABEL", value: event.target.value, id: todo.id });
  };
  const finishedCallback = () => {
    // 退出编辑label模式
    setEditing(false);
  };
  // 回车完成编辑
  const onEnter = useOnEnter(finishedCallback);

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
          className="edit"
          // TODO 不应该实时改label值的，支持回车才真的改值！
          value={todo.label}
          onChange={onChange}
          onKeyPress={onEnter}
        />
      )}
    </li>
  );
}
