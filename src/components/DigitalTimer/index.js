import {Component} from 'react'

import './index.css'

const initialState = {
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
  isTimerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  increaseLimitByOneMinute = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  decreaseLimitByOneMinute = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimiter = () => {
    const {timeElapsedInSeconds} = this.state
    const isTimeRunning = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-limit-container">
        <button
          type="button"
          className="plus-minus-btn"
          disabled={isTimeRunning}
          onClick={this.decreaseLimitByOneMinute}
        >
          -
        </button>
        <div className="timer-limit-display-container">
          <p className="timer-limit">25</p>
        </div>
        <button
          type="button"
          className="plus-minus-btn"
          disabled={isTimeRunning}
          onClick={this.increaseLimitByOneMinute}
        >
          +
        </button>
      </div>
    )
  }

  onClickResume = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  increaseTimeByOneSecond = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimeCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({
        isTimerRunning: true,
      })
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onClickStartOrPause = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isTimeCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimeCompleted) {
      this.setState({
        timeElapsedInSeconds: 0,
      })
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.increaseTimeByOneSecond, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerControllers = () => {
    const {isTimerRunning} = this.state
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imageAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <div className="start-resume-restart-container">
          <button
            type="button"
            className="start-resume-restart-btn"
            onClick={this.onClickStartOrPause}
          >
            <img
              src={imgUrl}
              alt={imageAltText}
              className="start-resume-restart-img"
            />
            <p className="start-resume-restart-text">
              {isTimerRunning ? 'Pause' : 'Start'}
            </p>
          </button>
        </div>
        <div className="start-resume-restart-container">
          <button
            type="button"
            className="start-resume-restart-btn"
            onClick={this.onClickResume}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="start-resume-restart-img"
            />
          </button>
          <p className="start-resume-restart-text">Restart</p>
        </div>
      </div>
    )
  }

  getElapsedTime = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state

    const totalTimeRemaining = timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalTimeRemaining / 60)
    const seconds = Math.floor(totalTimeRemaining % 60)

    const stringifyMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifySeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifyMinutes}:${stringifySeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="app-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-status-container">
            <div className="display-time-status-container">
              <h1 className="timer">{this.getElapsedTime()}</h1>
              <p className="status">{isTimerRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-settings-container">
            {this.renderTimerControllers()}
            <p className="description">Set Timer Limit</p>
            {this.renderTimerLimiter()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
