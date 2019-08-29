import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatUnixTime } from "./utils";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Error from "./Error";

const MSG_NUMS = 15;

let cache = {};

function News({ url }) {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [newsList, setNewsList] = useState([]);

  useEffect(() => {
    console.log("变量输出 cache[url]: ", cache[url]);
    if (cache[url]) {
      setLoading(false);
      setNewsList(cache[url]);
      return;
    }
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(newsIds => {
        Promise.all(
          newsIds.slice(0, MSG_NUMS).map(id => {
            let newsUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
            return fetch(newsUrl).then(res => res.json());
          })
        )
          .then(list => {
            setNewsList(list);
            setLoading(false);
            setError(null);
            cache[url] = list;
          })
          .catch(e => {
            setError(`Failed to load details: ${e.message}`);
            setLoading(false);
          });
      })
      .catch(e => {
        setError(`Failed to load news ids: ${e.message}`);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <ul className="news-list">
      {newsList.map(item => (
        <li key={item.id} className="news-item">
          <a href={item.url} className="news-item__title">
            {item.title}
          </a>
          <div className="news-item__info">
            by <Link to={`/user?id=${item.by}`}>{item.by}</Link> on{" "}
            {formatUnixTime(item.time)} with{" "}
            <Link to={`/item?id=${item.id}`}>{item.descendants}</Link> comments
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
