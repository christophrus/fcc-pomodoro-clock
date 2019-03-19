import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import LengthController from './components/LengthController';
import Timer from './classes/Timer';

// PROJECTOR SELECTOR FOR EXTERNAL TEST SCRIPT:
localStorage.setItem('example_project', 'Pomodoro Clock');

const defaultState = {
  breakLength: 5,
  sessionLength:  25,
  timer: "25:00",
  timerLabel: "Session",
  timerActiveId: null
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { ...defaultState };

    this.toggleCoundDown = this.toggleCoundDown.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setBreak = this.setBreak.bind(this);
    this.reset = this.reset.bind(this);
  }


  reset() {
    let audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
    clearInterval(this.state.timerActiveId);
    this.setState(defaultState);
  }

  setSession(e) {

    let { sessionLength } = this.state;

    if ( e.target.value === "+" && sessionLength < 60) {
      sessionLength++;
      let timer = new Timer(sessionLength);
      this.setState({
        sessionLength: sessionLength,
        timer: timer.display
      });
    } else if (e.target.value === "-" && sessionLength > 1) {
      sessionLength--;
      let timer = new Timer(sessionLength);
      this.setState({
        sessionLength: sessionLength,
        timer: timer.display
      });
    }
  }

  setBreak(e) {

    let { breakLength } = this.state;

    if (e.target.value === "+" && breakLength < 60) {
      this.setState({
        breakLength: ++breakLength,
      })
    } else if (e.target.value === "-" && breakLength > 1) {
      this.setState({
        breakLength: --breakLength,
      })
    }   
  }

  toggleCoundDown(e) {

    if (this.state.timerActiveId) {

      clearInterval(this.state.timerActiveId);
      this.setState({
        timerActiveId: null
      });
    } else {

      let timerId = setInterval(() => {

        let { timerLabel } = this.state;
        let timer = new Timer(this.state.timer);
        timer.decrement();

        if (timer.seconds < 0) {

          let audio = document.getElementById("beep");
          audio.play();

          if ( timerLabel === 'Session') {
            timerLabel = "Break";
            timer.display = this.state.breakLength;
          } else {
            timerLabel = "Session";
            timer.display = this.state.sessionLength;
          }
        }
  
        this.setState({
          timer: timer.display,
          timerLabel: timerLabel
        })
      } ,1000);
  
      this.setState({
        timerActiveId: timerId
      })
    }
  }

  render() {

    const { breakLength, sessionLength, timerLabel, timer, timerActiveId} = this.state;

    return (
      <main className="flex flex-col justify-center items-center h-screen bg-teal-dark text-pink-darkest font-mono">
        <h1>Pomodoro Clock</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <LengthController
            id="break-length" labelId="break-label" label="Break Length"
            dataElement="break" incId="break-increment" decId="break-decrement"
            onClick={this.setBreak} length={breakLength} 
          />
          <div className="flex flex-col justify-center items-center rounded-full shadow-lg bg-teal-light p-12 lg:p-24 m-2 lg:m-12">
            <span className="text-2xl" id="timer-label">{timerLabel}</span>
            <span className="text-5xl" id="time-left">{timer}</span><br />
          </div>
          <LengthController
            id="session-length" labelId="session-label" label="Session Length"
            dataElement="session" incId="session-increment" decId="session-decrement"
            onClick={this.setSession} length={sessionLength}
          />
        </div>
        <div>
          <button id="start_stop" onClick={this.toggleCoundDown} className={'p-5 m-2 rounded-full text-pink-darkest shadow-md bg-teal fa-3x fa ' + (timerActiveId ? 'fa-pause' : 'fa-play')}></button>
          <button id="reset" className="p-5 m-2 rounded-full text-pink-darkest shadow-md bg-teal fa fa-undo fa-3x" onClick={this.reset}></button>
        </div>
        <audio id="beep" src="audio/ring.mp3"></audio>
      </main>
    );
  }
}

export default App;
