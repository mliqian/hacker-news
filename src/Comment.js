import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

Comment.propTypes = {
  id: PropTypes.number.isRequired
};

function Comment({ id }) {
  let [data, setData] = useState(null);
  console.log("变量输出 id: ", id);
  useEffect(() => {
    fetch(itemUrl(id))
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, [id]);
  if (!data) return <div></div>;
  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

function itemUrl(id) {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}
export default Comment;
