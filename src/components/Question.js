class Question {
  constructor(
    { question, answers },
    questionTemplate,
    handleAnswerClick,
    submitCallback
  ) {
    this._question = question;
    this._answers = answers;
    this._questionTemplate = questionTemplate;
    this._handleAnswerClick = handleAnswerClick;
    this._submitCallback = submitCallback;
  }

  _getQuestionTemplate() {
    const _questionTemplateContent = this._questionTemplate.cloneNode(true);
    return _questionTemplateContent;
  }

  generateQuestion() {
    const questionContent = this._getQuestionTemplate(),
      question = questionContent.querySelector('.question'),
      answers = questionContent.querySelectorAll('.answer'),
      questionContainer = questionContent.querySelector(
        `.${this._questionTemplate}`
      );

    question.textContent = this._question;
    for (let i = 0; i < answers.length; i++) {
      answers[i].textContent = this._answers[i];
    }

    this._setEventListeners(questionContainer);

    return questionContainer;
  }

  _setEventListeners(questionContainer) {
    const form = questionContainer.querySelector('form'),
      answers = questionContent.querySelectorAll('.answer');

    form.addEventListener('submit', this._submitCallback);
    answers.forEach((answer) => {
      answer.addEventListener('click', this._answer);
    });
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
