import './index.css';
import * as Constants from '../components/Constants.js';
import Api from '../components/Api.js';
import Screen from '../components/Screen';
import Question from '../components/Question.js';
import ScoreCalculator from '../components/ScoreCalculator';

const screen = new Screen(
  {
    start: Constants.screenStartSelector,
    process: Constants.screenProcessSeelector,
    end: Constants.screenEndSeelector,
  },
  Constants.sreenOpenedClass
);

const api = new Api({
  baseUrl: 'https://opentdb.com/',
  getTokenHandler: () => {
    screen.switchScreen('start');
  },
});

const score = new ScoreCalculator();

let question;
document
  .querySelector(Constants.startButtonSelector)
  .addEventListener('click', () => {
    const questionAmount = 5;
    api
      .getQuestions(questionAmount)
      .then((questions) => {
        question = new Question(
          questions,
          {
            questionFormSelector: Constants.questionFormSelector,
            questionSelector: Constants.questionSelector,
            answersSelector: Constants.answersContainerSelector,
            answerTemplateSelector: Constants.answerButtonTemplateSelector,
            answerButtonSelector: Constants.answerButtonSelector,
            counterTextSelector: Constants.counterTextSelector,
            nextButtonSelector: Constants.nextButtonSelector,
            answerIconsSelector: Constants.answerIconsSelector,
            correctIconSelectors: Constants.correctIconSelectors,
            incorrectIconSelectors: Constants.incorrectIconSelectors,
            iconsTemplateSelector: Constants.iconsTemplateSelector,
          },
          {
            correctAnswerClass: Constants.correctAnswerClass,
            incorrectAnswerClass: Constants.incorrectAnswerClass,
          },
          (evt) => {
            evt.preventDefault();
            if (!question.next()) {
              const sessionScore = score.returnScore();
              document.querySelector(Constants.finalTimeSelector).textContent =
                sessionScore.testTime;
              document.querySelector(
                Constants.answerResultSelector
              ).textContent = `${sessionScore.rightAnswers} из ${sessionScore.allAnswers}`;
              screen.switchScreen('end');
            }
          },
          (isCorrect) => {
            score.updateScore(isCorrect);
          }
        );

        question.next();
        score.setTimer();
        screen.switchScreen('process');
      })
      .catch((err) => {
        console.log(err);
      });
  });
