import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import useOnClickOutside from "use-onclickoutside";
import { del, toggle, setLabel } from "../store/todos/todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(del(todo.id));
  };

  const onDone = () => {
    dispatch(toggle({ id: todo.id }));
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
      dispatch(setLabel({ value: event.target.value, id: todo.id }));
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
