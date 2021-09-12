import { useReducer } from "react";
import { guid } from "../utils";

const initialState = [];

const newTodo = (label) => ({
  done: false,
  id: guid(),
  label: (label || "").trim(),
});

const reducer = (items, action) => {
  switch (action.type) {
    case "ADD":
      return items.concat(newTodo(action.label));
    case "DEL":
      return items.filter((i) => i.id !== action.id);
    default:
      throw Error("未知类型");
  }
};

export default function useTodos() {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return [todos, dispatch];
}
