class Question {
  constructor(questionList, selectors, classes, submitCallback, answerHandler) {
    this._questions = questionList;
    this._currentQuestionIndex = null;

    this._questionForm = document.querySelector(selectors.questionFormSelector);
    this._questionElement = document.querySelector(selectors.questionSelector);
    this._answerContainer = document.querySelector(selectors.answersSelector);
    this._answerTemplateSelector = selectors.answerTemplateSelector;
    this._answerButtonSelector = selectors.answerButtonSelector;
    this._counterElement = document.querySelector(
      selectors.counterTextSelector
    );
    this._nextButton = this._questionForm.querySelector(
      selectors.nextButtonSelector
    );
    (this._answerIcons = document.querySelector(selectors.answerIconsSelector)),
      (this._iconTemplates = document.querySelector(
        selectors.iconsTemplateSelector
      ));
    this._correctIconTemplate = this._iconTemplates.content.querySelector(
      selectors.correctIconSelectors
    );
    this._incorrectIconTemplate = this._iconTemplates.content.querySelector(
      selectors.incorrectIconSelectors
    );

    this._correctAnswerClass = classes.correctAnswerClass;
    this._incorrectAnswerClass = classes.incorrectAnswerClass;

    this._answerHandler = answerHandler.bind(this);
    this._submitCallback = submitCallback.bind(this);
  }

  _generateIcon(isCorrect) {
    return isCorrect
      ? this._correctIconTemplate.cloneNode(true)
      : this._incorrectIconTemplate.cloneNode(true);
  }

  _generateAnswerTemplate() {
    const answerElement = document
      .querySelector(this._answerTemplateSelector)
      .content.querySelector(this._answerButtonSelector)
      .cloneNode(true);

    return answerElement;
  }

  _generateAnswers() {
    this._answerContainer.innerHTML = '';
    this._shuffle(this._questions[this._currentQuestionIndex].answers).forEach(
      (answer) => {
        const answerElement = this._generateAnswerTemplate();
        answerElement.textContent = answer.text;
        this._answerContainer.prepend(answerElement);
      }
    );
  }

  _generateQuestion() {
    this._questionElement.textContent = this._questions[
      this._currentQuestionIndex
    ].question;
    this._generateAnswers();
    this._counterElement.textContent = `Вопрос: ${
      this._currentQuestionIndex + 1
    } из ${this._questions.length}`;
    this._nextButton.setAttribute('disabled', 1);

    this._setEventListeners();
  }

  _setEventListeners() {
    const answers = Array.from(
      this._answerContainer.querySelectorAll(this._answerButtonSelector)
    );
    const correctAnswer = this._questions[
      this._currentQuestionIndex
    ].answers.find((elem) => elem.isCorrect);
    const correctAnswerElement = answers.find(
      (elem) => elem.textContent === correctAnswer.text
    );

    this._questionForm.addEventListener('submit', this._submitCallback);
    answers.forEach((answer) => {
      answer.addEventListener('click', () => {
        const answerIsCorrect = this._questions[
          this._currentQuestionIndex
        ].answers.some(
          (elem) => elem.text === answer.textContent && elem.isCorrect
        );
        if (answerIsCorrect) {
          answer.classList.add(this._correctAnswerClass);
        } else {
          answer.classList.add(this._incorrectAnswerClass);
          correctAnswerElement.classList.add(this._correctAnswerClass);
        }
        this._nextButton.removeAttribute('disabled');
        this._answerIcons.append(this._generateIcon(answerIsCorrect));

        this._answerHandler(answerIsCorrect);
      });
    });
  }

  setQuestions(questionList) {
    this._questions = questionList;
  }

  next() {
    if (
      this._currentQuestionIndex + 1 < this._questions.length ||
      this._currentQuestionIndex === null
    ) {
      if (this._currentQuestionIndex === null) {
        this._currentQuestionIndex = 0;
      } else {
        this._currentQuestionIndex++;
      }
      this._generateQuestion();

      return true;
    } else {
      return false;
    }
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export default Question;
