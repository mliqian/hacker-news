import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatUnixTime } from "./utils";

Comment.propTypes = {
  id: PropTypes.number.isRequired
};

function Comment({ id }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetch(itemUrl(id))
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, [id]);
  if (!data) return <div></div>;
  return (
    <div style={{ marginLeft: 30 }}>
      <pre>{JSON.stringify(data)}</pre>
      <div>
        by {data.by} {formatUnixTime(data.time)}
      </div>
      {(data.kids || []).map(kid => (
        <Comment key={kid} id={kid} />
      ))}
    </div>
  );
}

function itemUrl(id) {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}
export default Comment;
