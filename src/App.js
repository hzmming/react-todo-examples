import { BrowserRouter as Router, Route } from "react-router-dom";
import "todomvc-app-css/index.css";
import TodoList from "./containers/TodoList";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="todoapp">
        <Route path="/:filter" children={TodoList}></Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
