export default function TodoItem() {
  const onDelete = () => {
    // TODO
  };

  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>hello</label>
        <button onClick={onDelete}></button>
      </div>
    </li>
  );
}
