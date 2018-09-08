import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Achievement from './Achievement';

class AchievementSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: []
    };
  }

  changeLevelAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: 'level',
          text: `Your level has been upgrated to ${this.props.level + 1}`,
          id: `level${this.props.level + 1}`
        }
      ]
    }));
  };

  changePerClickAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: 'perClick',
          text: `For 1 click you add ${this.props.perClick + 1} points`,
          id: `perClick${this.props.perClick + 1}`
        }
      ]
    }));
  };

  changePerSecondAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: 'level',
          text: `For 1 second you get ${this.props.perSecond + 1} ${
            this.props.perSecond + 1 === 1 ? 'point' : 'points'
          }`,
          id: `perSecond${this.props.perSecond + 1}`
        }
      ]
    }));
  };

  handleAchievementClose = e => {
    const id = e.target.id;
    this.setState(() => ({
      achievements: this.state.achievements.filter(ach => ach.id !== id)
    }));
  };

  render() {
    return (
      <div className="app__sidebar">
        <p>Achievement bar</p>
        <TransitionGroup>
          {this.state.achievements.map(ach => (
            <CSSTransition key={ach.id} timeout={600} classNames="fade">
              <Achievement
                id={ach.id}
                handleAchievementClose={this.handleAchievementClose}
              >
                {ach.text} {ach.count}
              </Achievement>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

AchievementSidebar.propTypes = {
  achievements: PropTypes.array.isRequired,
  handleAchievementClose: PropTypes.func.isRequired
};

AchievementSidebar.defaultProps = {
  achievements: [],
  handleAchievementClose: () => {}
};

export default AchievementSidebar;
