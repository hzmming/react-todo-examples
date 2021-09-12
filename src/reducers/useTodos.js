import { guid } from "../utils";
import { useImmerReducer } from "use-immer";

const initialState = [];

const newTodo = (label) => ({
  done: false,
  id: guid(),
  label: (label || "").trim(),
});

const reducer = (items, action) => {
  // OPTIMIZE reducer这种字符串形式根本看不清，而且case也没有块级作用域，命名还会冲突，要封装成函数才合理
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
        target.done = action.value !== undefined ? action.value : !target.done;
      }
      break;
    case "TOGGLE_ALL":
      items.forEach(
        (i) => (i.done = action.value !== undefined ? action.value : !i.done)
      );
      break;
    case "SET_LABEL":
      const item = items.find((i) => i.id === action.id);
      if (item) {
        item.label = action.value;
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
