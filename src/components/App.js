import React from "react";
import PropTypes from "prop-types";

import Clicker from "./Clicker";
import Progress from "./Progress";
import AchievementSidebar from "./AchievementSidebar";

import showLevel from "../helpers/showLevel";
import updatePerClick from "../helpers/updatePerClick";
import updatePerSecond from "../helpers/updatePerSecond";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCounts: 0,
      level: 1,
      perClick: 1,
      perSecond: 0,
      achievements: []
    };
  }

  componentDidMount() {
    setInterval(this.updateClicks, 1000);
    this.setState({
      clickCounts: 0
    });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.clickCounts);
  }

  updateClicks = () => {
    this.setState(() => ({
      clickCounts: this.state.clickCounts + updatePerSecond(this.state.level)
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      showLevel(prevState.clickCounts) !== showLevel(this.state.clickCounts)
    ) {
      this.setState(() => ({
        level: showLevel(this.state.clickCounts)
      }));
      this.changeLevelAchievement();
    } else if (
      updatePerClick(prevState.level) !== updatePerClick(this.state.level)
    ) {
      this.setState(() => ({
        perClick: updatePerClick(this.state.level),
        perSecond: updatePerSecond(this.state.level)
      }));
      this.changePerClickAchievement();
      this.changePerSecondAchievement();
    }
  }

  changeLevelAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: "level",
          text: `Your level has been upgrated to ${prevState.level}`,
          id: `level${prevState.level}`
        }
      ]
    }));
  };

  changePerClickAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: "perClick",
          text: `For 1 click you add ${prevState.perClick} points`,
          id: `perClick${prevState.perClick}`
        }
      ]
    }));
  };

  changePerSecondAchievement = () => {
    this.setState(prevState => ({
      achievements: [
        ...prevState.achievements,
        {
          type: "level",
          text: `For 1 second you get ${prevState.perSecond} ${
            prevState.perSecond === 1 ? "point" : "points"
          }`,
          id: `perSecond${prevState.perSecond}`
        }
      ]
    }));
  };

  handleClickCounts = () => {
    this.setState(prevState => ({
      clickCounts: prevState.clickCounts + prevState.perClick
    }));
  };

  handleAchievementClose = e => {
    const id = e.target.id;
    this.setState(() => ({
      achievements: this.state.achievements.filter(ach => ach.id !== id)
    }));
  };

  render() {
    const {
      clickCounts,
      level,
      perClick,
      perSecond,
      achievements
    } = this.state;
    return (
      <div
        className={
          clickCounts % 25 === 0 && clickCounts !== 0 ? "app bg" : "app"
        }
      >
        <div className="app__click">
          <Progress
            perSecond={perSecond}
            level={level}
            clicks={clickCounts}
            perClick={perClick}
          />
          <Clicker
            handleCountClicks={this.handleClickCounts}
            clicks={clickCounts}
            perClick={perClick}
          />
        </div>
        <AchievementSidebar
          achievements={achievements}
          handleAchievementClose={this.handleAchievementClose}
        />
      </div>
    );
  }
}

App.defaultProps = {
  clickCounts: 0,
  level: 1,
  perClick: 1,
  perSecond: 0,
  achievements: []
};

App.propTypes = {
  clickCounts: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  perClick: PropTypes.number.isRequired,
  perSecond: PropTypes.number.isRequired,
  achievements: PropTypes.array
};

export default App;
