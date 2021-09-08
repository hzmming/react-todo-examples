import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" />
      </header>

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          <TodoItem />
        </ul>
      </section>
    </>
  );
}
