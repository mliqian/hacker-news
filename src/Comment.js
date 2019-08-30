import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatUnixTime } from "./utils";
import { Link } from "react-router-dom";

Comment.propTypes = {
  id: PropTypes.number.isRequired
};

function Comment({ id }) {
  let [data, setData] = useState(null);
  let [isFold, setFold] = useState(false);

  useEffect(() => {
    fetch(itemUrl(id))
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, [id]);
  function handleFold() {
    setFold(fold => !fold);
  }
  if (!data) return <div></div>;
  return (
    <div className="comment-container">
      <div className="comment-info">
        <i
          className={`comment-folder ${isFold ? "fold" : "unfold"}`}
          onClick={handleFold}
        ></i>
        by <Link to={`/user?id=${data.by}`}>{data.by}</Link>{" "}
        {formatUnixTime(data.time)}
      </div>
      <div
        style={{
          overflow: "hidden",
          height: isFold ? 0 : "auto"
        }}
      >
        <p
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="comment-content"
        ></p>

        {(data.kids || []).map(kid => (
          <Comment key={kid} id={kid} />
        ))}
      </div>
    </div>
  );
}

function itemUrl(id) {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
}
export default Comment;
