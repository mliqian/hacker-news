import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Loading from "./Loading";
import { formatUserCreatedTime } from "./utils";

/*
User: {
  "about" : "This is a test",
  created: 1334265808
  id: "ingve"
  karma: 108620
  submitted: [20803091, 20802509, ...]
}
*/
function User({ location }) {
  let [user, setUser] = useState(null);
  let { id } = queryString.parse(location.search);
  let url = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;
  useEffect(
    function() {
      fetch(url)
        .then(res => res.json())
        .then(setUser);
    },
    [url]
  );

  if (!user) {
    return <Loading />;
  }
  return (
    <table className="user-table">
      <tbody>
        <tr>
          <td>User:</td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>Created:</td>
          <td>{formatUserCreatedTime(user.created)}</td>
        </tr>
        <tr>
          <td>karma:</td>
          <td>{user.karma}</td>
        </tr>
        <tr>
          <td>about:</td>
          <td>{user.about}</td>
        </tr>
      </tbody>
    </table>
  );
}

User.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default User;
