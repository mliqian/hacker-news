import React from "react";
import PropTypes from "prop-types";

function Error({ message }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2em"
      }}
    >
      <div
        style={{
          fontSize: "3em"
        }}
      >
        Failed
      </div>
      <div
        style={{
          fontSize: "1em",
          color: "gray"
        }}
      >
        {message}
      </div>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
