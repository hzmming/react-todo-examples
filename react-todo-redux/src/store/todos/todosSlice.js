import { createSlice } from "@reduxjs/toolkit";
import { guid } from "../../utils";

const initialState = {
  items: [],
};

const newTodo = (label) => ({
  done: false,
  id: guid(),
  label: (label || "").trim(),
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const { items } = state;
      items.push(newTodo(payload));
    },

    del: (state, { payload }) => {
      const { items } = state;
      const index = items.findIndex((i) => i.id === payload);
      index !== -1 && items.splice(index, 1);
    },

    toggle: (state, { payload }) => {
      const { items } = state;
      const target = items.find((i) => i.id === payload.id);
      if (target) {
        target.done =
          payload.value !== undefined ? payload.value : !target.done;
      }
    },

    toggleAll: (state, { payload }) => {
      const { items } = state;
      items.forEach(
        (i) => (i.done = payload !== undefined ? payload : !i.done)
      );
    },

    setLabel: (state, { payload }) => {
      const { items } = state;
      const item = items.find((i) => i.id === payload.id);
      if (item) {
        item.label = payload.value;
      }
    },
  },
});

// 导出actions
export const { add, del, toggle, toggleAll, setLabel } = todosSlice.actions;

export const selectTodos = (state) => state.todos.items;

export default todosSlice.reducer;
