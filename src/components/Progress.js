import React from "react";
import PropTypes from "prop-types";

const Progress = ({ clicks, level, perClick, perSecond }) => (
  <div className="progress">
    <span className="progress__clicks">
      clicks: <span className="black">{clicks}</span>
    </span>
    <span className="progress__level">
      level: <span className="black">{level}</span>
    </span>
    <span className="progress__perClick">
      per click: <span className="black">{perClick}</span>
    </span>
    <span className="progress__perSecond">
      per second: <span className="black">{perSecond}</span>
    </span>
  </div>
);

Progress.defaultProps = {
  clicks: 0,
  level: 1,
  perClick: 1,
  perSecond: 0
};

Progress.propTypes = {
  clicks: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  perClick: PropTypes.number.isRequired,
  perSecond: PropTypes.number.isRequired
};

export default Progress;
