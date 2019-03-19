class Timer {

    constructor(time) {
      this.seconds = 0;
      this.display = time;
    }
  
    decrement() {
      this.seconds -= 1;
    }
  
    set display(time) {
      let minutes=0, seconds = 0;
      if (typeof time === "string") {
        [minutes, seconds] = time.split(":");
      } else {
        minutes = time;
      }
      this.seconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  
    }
  
    get display() {
      let minutes = parseInt(this.seconds / 60, 10);
      let seconds = parseInt(this.seconds % 60, 10);
      return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    }
  
  }

  export default Timer;