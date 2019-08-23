import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">TOP</Link>
        </li>
        <li>
          <Link to="/new">NEW</Link>
        </li>
      </ul>
    </div>
  );
}

function TopNews() {
  return <h1>Top News</h1>;
}
function NewNews() {
  return <h1>Newest News</h1>;
}

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Route exact path="/" component={TopNews} />
        <Route path="/new" component={NewNews} />
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
