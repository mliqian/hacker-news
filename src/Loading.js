import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

let loadingStyle = {
  fontSize: "1.25rem",
  textAlign: "center",
  padding: 20
};

function Loading({ initialText }) {
  let [text, setText] = useState(initialText);

  useEffect(
    function() {
      let timerid = window.setInterval(function() {
        setText(text =>
          text === `${initialText}...` ? initialText : text + "."
        );
      }, 300);
      return () => window.clearInterval(timerid);
    },
    [initialText]
  );
  return <div style={loadingStyle}>{text}</div>;
}

Loading.defaultProps = {
  initialText: "Loading"
};

Loading.propTypes = {
  initialText: PropTypes.string
};

export default Loading;
