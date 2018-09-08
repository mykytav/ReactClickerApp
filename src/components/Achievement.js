import React from 'react';
import PropTypes from 'prop-types';

const Achievement = ({ children, id, handleAchievementClose }) => (
  <p className="achievement">
    Congratulations! {children}
    <span className="achievement__btn" id={id} onClick={handleAchievementClose}>
      x
    </span>
  </p>
);

Achievement.propTypes = {
  handleAchievementClose: PropTypes.func.isRequired
};

Achievement.defaultProps = {
  handleAchievementClose: () => {}
};

export default Achievement;
