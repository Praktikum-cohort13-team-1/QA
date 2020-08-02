export default class ScoreCalculator {
    constructor() {
        this._rightAnswers = 0;
        this._wrongAnswers = 0;
    }

    updateScore(isRight) {
        if(isRight) {
            this._rightAnswers += 1;
        } else {
            this._wrongAnswers += 1;
        }
    }

    setTimer() {
        this._starTime = new Date(Date.now());
    }

    getTimeOfTest() {
        this._endTime = new Date(Date.now());
        this._totalTime = `${this._endTime.getHours() - this._starTime.getHours()}:${this._endTime.getMinutes() - this._starTime.getMinutes()}:${this._endTime.getSeconds() - this._starTime.getSeconds()}`;
        return this._totalTime;
    }

    returnScore() {
        this._scoreData = {};
        this._scoreData.rightAnswers = this._rightAnswers;
        this._scoreData.wrongAnswers = this._wrongAnswers;
        this._scoreData.allAnswers = this._rightAnswers + this._wrongAnswers;
        this._scoreData.testTime = this.getTimeOfTest(); 
        return this._scoreData;
    }

    reset(){
        this._rightAnswers = 0;
        this._wrongAnswers = 0;
    }
}