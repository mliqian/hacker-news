import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import News from "./News";

function Nav() {
  let theme = "light";
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
      <div>{theme == "light" ? "🌒" : "🌕"}</div>
    </div>
  );
}

function TopNews() {
  const topNewsUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
  return <News url={topNewsUrl} />;
}
function NewNews() {
  const newestNewsUrl = "https://hacker-news.firebaseio.com/v0/newstories.json";
  return <News url={newestNewsUrl} />;
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
