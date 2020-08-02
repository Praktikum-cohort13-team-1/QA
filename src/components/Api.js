import he from 'he/he';

class Api {
  constructor(config) {
    this._getTokenHandler = config.getTokenHandler.bind(this);
    this._baseUrl = config.baseUrl;
    this._setupApi().catch((err) => {
      console.error(err);
    });
  }

  _fetchApi(url, method, additionalHeaders, body) {
    const fetchOptions = {
      method: method,
      headers: { ...this._headers, ...additionalHeaders },
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, fetchOptions).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  _setupApi() {
    if (this._baseUrl === 'https://opentdb.com/') {
      this._responseCodes = {
        Success: 0,
        NoResults: 1,
        InvalidParameter: 2,
        TokenNotFound: 3,
        TokenEmpty: 4,
      };

      this._difficultyOptions = {
        easy: 'easy',
        medium: 'medium',
        hard: 'hard',
      };

      return this._setToken().then(() => {
        this._getTokenHandler();
      });
    } else if (this._baseUrl === 'https://jservice.io/api') {
      //в jservice нет возможности работать по токенам
      return Promise.resolve();
    } else {
      return Promise.reject(
        'Выбран некорректный ресурс для получения вопросов.'
      );
    }
  }

  _setToken() {
    if (this._baseUrl === 'https://opentdb.com/') {
      return this._getSessionToken().then((res) => {
        if (res.response_code === 0) {
          this._token = res.token;
        } else {
          return Promise.reject(res.response_message);
        }
      });
    }
  }

  _getSessionToken() {
    return this._fetchApi('api_token.php?command=request', 'GET');
  }

  _resetSessionToken() {
    return this._fetchApi(
      `api_token.php?command=reset&token=${this._token}`,
      'GET'
    );
  }

  getQuestions(amount, category, difficulty) {
    if (this._baseUrl === 'https://opentdb.com/') {
      const categoryOption = category ? `&category=${category}` : '',
        difficultyOption = difficulty
          ? `&difficulty=${this._difficultyOptions[difficulty]}`
          : '';

      return this._fetchApi(
        `api.php?amount=${amount}&token=${this._token}${categoryOption}${difficultyOption}`
      ).then((res) => {
        if (res.response_code === this._responseCodes.Success) {
          return res.results.map((elem) => {
            const questionObject = {};
            questionObject.question = he.decode(elem.question);
            questionObject.answers = elem.incorrect_answers
              .map((answer) => {
                return { text: he.decode(answer) };
              })
              .concat({
                text: he.decode(elem.correct_answer),
                isCorrect: true,
              });
            return questionObject;
          });
        } else if (
          res.response_code === this._responseCodes.NoResults ||
          res.response_code === this._responseCodes.TokenNotFound ||
          res.response_code === this._responseCodes.TokenEmpty
        ) {
          return Promise.reject('Обновите свой токен');
        } else if (res.response_code === this._responseCodes.InvalidParameter) {
          return Promise.reject('Некорректные параметры запроса');
        } else {
          return Promise.reject('Неизвестная ошибка');
        }
      });
    } else if (this._baseUrl === 'https://jservice.io/api') {
      //нет возможности настройки сложности и категорий
      return this._fetchApi(`random?count=${amount}`).then((res) => {
        return res;
      });
    } else {
      return Promise.reject(
        'Выбран некорректный ресурс для получения вопросов.'
      );
    }
  }
}

export default Api;
