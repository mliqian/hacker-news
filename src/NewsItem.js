import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Comment from "./Comment";
import { formatUnixTime } from "./utils";

function itemUrl(id) {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}

function NewsItem({ location }) {
  let { id } = queryString.parse(location.search);
  let [info, setInfo] = useState(null);
  useEffect(() => {
    let url = itemUrl(id);
    fetch(url)
      .then(res => res.json())
      .then(info => {
        setInfo(info);
      });
  }, [id]);

  if (!info) {
    return <Loading />;
  }

  return (
    <div className="news-detail">
      <h1 className="news-detail__title">{info.title}</h1>
      <div className="news-detail__info">
        by <Link to={`/user?id=${info.by}`}>{info.by}</Link> on{" "}
        {formatUnixTime(info.time)} with <em>{info.descendants}</em> comments
      </div>
      <div className="news-detail__comments">
        {(info.kids || []).map(cid => (
          <Comment key={cid} id={cid} />
        ))}
      </div>
    </div>
  );
}

NewsItem.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default NewsItem;
