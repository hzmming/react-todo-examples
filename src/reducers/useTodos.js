import { guid } from "../utils";
import { useImmerReducer } from "use-immer";

const initialState = [];

const newTodo = (label) => ({
  done: false,
  id: guid(),
  label: (label || "").trim(),
});

const reducer = (items, action) => {
  switch (action.type) {
    case "ADD":
      items.push(newTodo(action.label));
      break;
    case "DEL":
      const index = items.findIndex((i) => i.id === action.id);
      index !== -1 && items.splice(index, 1);
      break;
    case "TOGGLE":
      const target = items.find((i) => i.id === action.id);
      if (target) {
        target.done = !target.done;
      }
      break;
    default:
      throw Error("未知类型");
  }
};

export default function useTodos() {
  const [todos, dispatch] = useImmerReducer(reducer, initialState);

  return [todos, dispatch];
}
