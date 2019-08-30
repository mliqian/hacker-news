import React, { useEffect, useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Comment from "./Comment";

function itemUrl(id) {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}

function NewsItem({ location }) {
  let { id } = queryString.parse(location.search);
  let [info, setInfo] = useState(null);
  let [comments, setComments] = useState([]);
  useEffect(() => {
    let url = itemUrl(id);
    fetch(url)
      .then(res => res.json())
      .then(info => {
        setInfo(info);
        setComments(info.kids || []);
      });
  }, [id]);

  if (!info) {
    return <Loading />;
  }

  return (
    <div>
      <pre>{JSON.stringify(info, null, 2)}</pre>
      {comments.map(cid => (
        <Comment key={cid} id={cid} />
      ))}
    </div>
  );
}

NewsItem.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default NewsItem;
