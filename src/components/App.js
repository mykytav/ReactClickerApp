import React from 'react';
import PropTypes from 'prop-types';

import Clicker from './Clicker';
import Progress from './Progress';
import AchievementSidebar from './AchievementSidebar';

import showLevel from '../helpers/showLevel';
import updatePerClick from '../helpers/updatePerClick';
import updatePerSecond from '../helpers/updatePerSecond';
import bgGenerator from '../helpers/bgGenerator';
import showBgCookie from '../helpers/showBgCookie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.AchievementSidebar = React.createRef();
    this.state = {
      clickCounts: 0,
      level: 1,
      perClick: 1,
      perSecond: 0
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
    this.setState({
      clickCounts: this.state.clickCounts + updatePerSecond(this.state.level)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      changeLevelAchievement,
      changePerClickAchievement,
      changePerSecondAchievement
    } = this.AchievementSidebar.current;
    let { clickCounts, level } = this.state;

    if (showLevel(prevState.clickCounts) !== showLevel(clickCounts)) {
      this.setState(() => ({
        level: showLevel(clickCounts)
      }));
      changeLevelAchievement();
    } else if (updatePerClick(prevState.level) !== updatePerClick(level)) {
      this.setState(() => ({
        perClick: updatePerClick(level),
        perSecond: updatePerSecond(level)
      }));
      changePerClickAchievement();
      changePerSecondAchievement();
    }
  }

  handleClickCounts = () => {
    this.setState(prevState => ({
      clickCounts: prevState.clickCounts + prevState.perClick
    }));
  };

  render() {
    const { clickCounts, level, perClick, perSecond } = this.state;

    return (
      <div
        className="app"
        style={showBgCookie(clickCounts) ? { background: bgGenerator() } : {}}
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
            showBgCookie={showBgCookie(clickCounts)}
            perClick={perClick}
          />
        </div>
        <AchievementSidebar
          ref={this.AchievementSidebar}
          level={level}
          perClick={perClick}
          perSecond={perSecond}
        />
      </div>
    );
  }
}

App.propTypes = {
  clickCounts: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  perClick: PropTypes.number.isRequired,
  perSecond: PropTypes.number.isRequired
};

App.defaultProps = {
  clickCounts: 0,
  level: 1,
  perClick: 1,
  perSecond: 0
};

export default App;
