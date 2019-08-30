import React from "react";
import PropTypes from "prop-types";
import { formatUnixTime } from "./utils";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Error from "./Error";
import useFetchNews from "./useFetchNews";

function News({ url, ids }) {
  let { loading, error, newsList } = useFetchNews(url, ids);

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <ul className="news-list">
      {newsList
        .filter(item => !item.deleted && item.type == "story")
        .map(item => (
          <li key={item.id} className="news-item">
            <a href={item.url} className="news-item__title">
              {item.title}
            </a>
            <div className="news-item__info">
              by <Link to={`/user?id=${item.by}`}>{item.by}</Link> on{" "}
              {formatUnixTime(item.time)} with{" "}
              <Link to={`/item?id=${item.id}`}>{item.descendants}</Link>{" "}
              comments
            </div>
          </li>
        ))}
    </ul>
  );
}

News.propTypes = {
  url: PropTypes.string,
  ids: PropTypes.arrayOf(PropTypes.number)
};

export default News;
