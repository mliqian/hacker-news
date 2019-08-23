import React, { useEffect, useState } from "react";

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
    <ul>
      {newsList.map((item, index) => (
        <li key={index}>
          <a href={item.url}>{item.title}</a>
          <div>
            by <a href={"item.authorLink"}>{item.by}</a> on{" "}
            {formatUnixTime(item.time)} with{" "}
            <a href="item.commentUrl">{item.descendants}</a> comments
          </div>
        </li>
      ))}
    </ul>
  );
}

function formatUnixTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${month}/${day}/${year}, ${hour}:${minute}`;
}

export default News;
