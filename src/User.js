import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

function User({ location }) {
  let { id } = queryString.parse(location.search);
  console.log("变量输出 user: ", id);
  return <div>User</div>;
}

User.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

export default User;
