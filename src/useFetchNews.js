import { useState, useEffect } from "react";
const MSG_NUMS = 30;

function useFetchNews(url, ids) {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [newsList, setNewsList] = useState([]);

  useEffect(() => {
    setLoading(true);

    if (url) {
      fetch(url)
        .then(res => res.json())
        .then(newsIds => {
          fetchNews(newsIds);
        })
        .catch(e => {
          setError(`Failed to load news ids: ${e.message}`);
          setLoading(false);
        });
    } else {
      fetchNews(ids);
    }

    function fetchNews(ids) {
      Promise.all(
        ids.slice(0, MSG_NUMS).map(id => {
          let newsUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
          return fetch(newsUrl).then(res => res.json());
        })
      )
        .then(list => {
          setNewsList(list);
          setLoading(false);
          setError(null);
        })
        .catch(e => {
          setError(`Failed to load details: ${e.message}`);
          setLoading(false);
        });
    }
  }, [url, ids]);

  return { loading, error, newsList };
}
export default useFetchNews;
