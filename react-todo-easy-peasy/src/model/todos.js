import { guid } from "../utils";
import { action } from "easy-peasy";

const newTodo = (label) => ({
  done: false,
  id: guid(),
  label: (label || "").trim(),
});

const todos = {
  items: [],

  add: action((state, label) => {
    const { items } = state;
    items.push(newTodo(label));
  }),

  del: action((state, id) => {
    const { items } = state;
    const index = items.findIndex((i) => i.id === id);
    index !== -1 && items.splice(index, 1);
  }),

  toggle: action((state, payload) => {
    const { items } = state;
    const target = items.find((i) => i.id === payload.id);
    if (target) {
      target.done = payload.value !== undefined ? payload.value : !target.done;
    }
  }),

  toggleAll: action((state, value) => {
    const { items } = state;
    items.forEach((i) => (i.done = value !== undefined ? value : !i.done));
  }),

  setLabel: action((state, payload) => {
    const { items } = state;
    const item = items.find((i) => i.id === payload.id);
    if (item) {
      item.label = payload.value;
    }
  }),
};

export default todos;
