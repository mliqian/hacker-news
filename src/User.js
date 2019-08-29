import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Loading from "./Loading";
import { formatUnixTime } from "./utils";
import News from "./News";

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
    <div>
      <h1>{user.id}</h1>
      <div>
        joined {formatUnixTime(user.created)} has {user.karma} karma
      </div>
      <div dangerouslySetInnerHTML={{ __html: user.about }}></div>
      <h2>Posts</h2>
      <News ids={user.submitted} />
    </div>
  );
}

User.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default User;
