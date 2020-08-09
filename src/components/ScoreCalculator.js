export default class ScoreCalculator {
  constructor() {
    this._rightAnswers = 0;
    this._wrongAnswers = 0;
  }

  updateScore(isRight) {
    if (isRight) {
      this._rightAnswers += 1;
    } else {
      this._wrongAnswers += 1;
    }
  }

  setTimer() {
    this._starTime = new Date();
  }

  getTimeOfTest() {
    this._endTime = new Date();
    this._totalTime = Math.trunc((this._endTime - this._starTime) / 1000);
    this._totalHours = Math.trunc(this._totalTime / 3600);
    this._totalMinutes = Math.trunc((this._totalTime % 3600) / 60);
    this._totalSeconds = this._totalTime % 60;
    return `${this._totalHours}:${this._totalMinutes}:${this._totalSeconds}`;
  }

  returnScore() {
    this._scoreData = {};
    this._scoreData.rightAnswers = this._rightAnswers;
    this._scoreData.wrongAnswers = this._wrongAnswers;
    this._scoreData.allAnswers = this._rightAnswers + this._wrongAnswers;
    this._scoreData.testTime = this.getTimeOfTest();
    return this._scoreData;
  }

  reset() {
    this._rightAnswers = 0;
    this._wrongAnswers = 0;
  }
}
