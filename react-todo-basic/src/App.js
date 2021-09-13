import { BrowserRouter as Router, Route } from "react-router-dom";
import "todomvc-app-css/index.css";
import TodoList from "./containers/TodoList";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="todoapp">
        {/* 
        注意此处children传的是<TodoList />，如果传成TodoList，会被当成普通函数执行，而不是创建React Element
        最直接的表现就是，TodoList里面用了hook立马报错。
        */}
        <Route path="/:filter?" children={<TodoList />}></Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
