import React from "react";
import mojs from "mo-js";
import PropTypes from "prop-types";

class Clicker extends React.Component {
  componentDidMount() {
    const countAnimation = new mojs.Html({
      el: "#clicker--count",
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -90, duration: 250, easing: "sin.out" },
      opacity: { 0: 1 },
      duration: 150
    }).then({
      opacity: { 1: 0 },
      y: -190,
      delay: 0
    });

    const triangleBurst = new mojs.Burst({
      parent: "#clicker",
      radius: { 40: 130 },
      count: 10,
      angle: 36,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        scale: 1,
        stroke: "rgba(255, 243, 0, 1)",
        strokeWidth: 3,
        angle: 30,
        delay: 30,
        speed: 0.82,
        easing: mojs.easing.bezier(0.3, 1, 0.3, 1),
        duration: 400
      }
    });

    this._animationTimeline = new mojs.Timeline();
    this._animationTimeline.add([countAnimation, triangleBurst]);
  }

  handleMouseUp = () => {
    this._animationTimeline.replay();
  };

  render() {
    const { clicks, handleCountClicks, perClick } = this.props;
    return (
      <div
        id="clicker"
        className={
          clicks % 25 === 0 && clicks !== 0 ? "clicker bgCookie" : "clicker"
        }
        onClick={handleCountClicks}
        onMouseUp={this.handleMouseUp}
      >
        <span id="clicker--count" className="clicker__count">
          +{perClick}
        </span>
      </div>
    );
  }
}

Clicker.defaultProps = {
  clicks: 0,
  perClick: 1,
  handleCountClicks: () => {}
};

Clicker.propTypes = {
  clicks: PropTypes.number.isRequired,
  perClick: PropTypes.number.isRequired,
  handleCountClicks: PropTypes.func
};

export default Clicker;
