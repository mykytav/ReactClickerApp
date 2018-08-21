import React from "react";
import ReactDOM from "react-dom";
import mojs from "mo-js";
import PropTypes from "prop-types";

class ClickerCount extends React.Component {

  componentDidMount() {
    const {
      triangleBurst,
      triangleBurstComplete,
      updateTriangleBurstComplete,
      unmount,
      posX,
      posY
    } = this.props;
    console.log(posY)
    const countAnimationDurationBefore = 300;
    const countAnimationDurationAfter = 200;
    const countAnimationDuration = countAnimationDurationBefore + countAnimationDurationAfter;
    const countAnimation = new mojs.Html({
      el: ReactDOM.findDOMNode(this),
      isShowStart: false,
      isShowEnd: true,
      y: { [posY]: posY - 90, duration: countAnimationDurationBefore, easing: "sin.out" },
      x: posX,
      opacity: { 0: 1 },
      duration: countAnimationDurationAfter
    }).then({
      opacity: { 1: 0 },
      y: posY - 190
    });

    countAnimation.play();
    setTimeout(unmount, countAnimationDuration);

    if (triangleBurstComplete)
      triangleBurst.replay();
      updateTriangleBurstComplete()
  }

  render() {
    const { perClick } = this.props;

    return (
      <span id="clicker--count" className="clicker__count">
        +{perClick}
      </span>
    );
  }
}

ClickerCount.defaultProps = {
  perClick: 1,
};

ClickerCount.propTypes = {
  perClick: PropTypes.number.isRequired,
};

export default ClickerCount;
