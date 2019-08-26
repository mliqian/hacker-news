import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatUnixTime } from "./utils";

const MSG_NUMS = 15;

function News({ url }) {
  let [loading, setLoading] = useState(true);
  let [newsList, setNewsList] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(newsIds => {
        Promise.all(
          newsIds.slice(0, MSG_NUMS).map(id => {
            let newsUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            return fetch(newsUrl).then(res => res.json());
          })
        ).then(list => {
          setNewsList(list);
          setLoading(false);
        });
      });
  }, [url]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul className="news-list">
      {newsList.map((item, index) => (
        <li key={index} className="news-item">
          <a href={item.url} className="news-item__title">
            {item.title}
          </a>
          <div className="news-item__info">
            by <a href={"item.authorLink"}>{item.by}</a> on{" "}
            {formatUnixTime(item.time)} with{" "}
            <a href="item.commentUrl">{item.descendants}</a> comments
          </div>
        </li>
      ))}
    </ul>
  );
}

News.propTypes = {
  url: PropTypes.string.isRequired
};

export default News;
