import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import Achievement from "./Achievement";

const AchievementSidebar = props => (
  <div className="app__sidebar">
    <p>Achievement bar</p>
    <TransitionGroup>
      {props.achievements.map(ach => (
        <CSSTransition key={ach.id} timeout={600} classNames="fade">
          <Achievement
            id={ach.id}
            handleAchievementClose={props.handleAchievementClose}
          >
            {ach.text} {ach.count}
          </Achievement>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

AchievementSidebar.defaultProps = {
  achievements: [],
  handleAchievementClose: () => {}
};

AchievementSidebar.propTypes = {
  achievements: PropTypes.array,
  handleAchievementClose: PropTypes.func
};

export default AchievementSidebar;
