import React from 'react';
import ReactDOM from 'react-dom';
import mojs from 'mo-js';
import PropTypes from 'prop-types';

import ClickerCount from './ClickerCount';

class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickerCounts: [],
      triangleBurstComplete: true,
      posX: 0,
      posY: 0
    };
  }

  unmountClickerCount = () => {
    // Every 5 clicks, unmount everything
    if (this.state.clickerCounts.length > 5)
      this.setState(prevState => ({
        clickerCounts: []
      }));
  };

  updateTriangleBurstComplete = () => {
    this.setState({ triangleBurstComplete: false });
  };

  componentDidMount() {
    this.triangleBurstDuration = 400;
    this.triangleBurst = new mojs.Burst({
      parent: ReactDOM.findDOMNode(this),
      radius: { 40: 130 },
      count: 10,
      angle: 36,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(255, 243, 0, 1)',
        strokeWidth: 3,
        angle: 30,
        delay: 30,
        speed: 0.82,
        easing: mojs.easing.bezier(0.3, 1, 0.3, 1),
        duration: this.triangleBurstDuration
      }
    });
  }

  handleMouseUp = e => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    const intervalId = setInterval(() => {
      this.setState({ triangleBurstComplete: true });
    }, this.triangleBurstDuration);

    const { perClick } = this.props;
    const body = document.body;
    const clicker = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const x =
      e.pageX - (clicker.left + body.scrollLeft - body.clientLeft) - 100;
    const y = e.pageY - (clicker.top + body.scrollTop - body.clientTop) - 100;
    this.setState(prevState => ({
      clickerCounts: [...prevState.clickerCounts, perClick],
      intervalId: intervalId,
      posX: x,
      posY: y
    }));
  };

  buildClickerCounts() {
    return this.state.clickerCounts.map((perClick, index) => (
      <ClickerCount
        perClick={perClick}
        unmount={this.unmountClickerCount}
        triangleBurst={this.triangleBurst}
        triangleBurstComplete={this.state.triangleBurstComplete}
        updateTriangleBurstComplete={this.updateTriangleBurstComplete}
        posX={this.state.posX}
        posY={this.state.posY}
        key={index}
      />
    ));
  }

  render() {
    const { showBgCookie, handleCountClicks } = this.props;
    let clickerCounts = this.buildClickerCounts();

    return (
      <div
        id="clicker"
        className={showBgCookie ? 'clicker bgCookie' : 'clicker'}
        onClick={handleCountClicks}
        onMouseUp={this.handleMouseUp}
      >
        {clickerCounts}
      </div>
    );
  }
}

Clicker.propTypes = {
  perClick: PropTypes.number.isRequired,
  handleCountClicks: PropTypes.func
};

Clicker.defaultProps = {
  perClick: 1,
  handleCountClicks: () => {}
};

export default Clicker;
