import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import News from "./News";
import "./index.css";
import Nav from "./Nav";
import User from "./User";
import NewsItem from "./NewsItem";

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
    <div className="root-container">
      <Router>
        <Nav />
        <Route exact path="/" component={TopNews} />
        <Route path="/new" component={NewNews} />
        <Route path="/user" component={User} />
        <Route path="/item" component={NewsItem} />
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
