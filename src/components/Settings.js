class Settings {
  constructor(selectors, eventHandlers, settingsOpenClass) {
    this._settingsElement = document.querySelector(selectors.settingsSelector);
    this._form = this._settingsElement.querySelector(selectors.formSelector);
    this._openEventHandler = eventHandlers.openEventHandler.bind(this);
    this._submitEventHandler = eventHandlers.submitEventHandler.bind(this);
    this._settingsOpenClass = settingsOpenClass;
  }

  _setEventHandlers() {
    this._form.addEventListener('submit', this._submitEventHandler);
  }

  setSettings(params) {
    this._url = params.url;
    this._questionAmount = params.questionAmount;
    this._time = params.time;
  }

  getSettings() {
    return {
      url: this._url,
      questionAmount: this._questionAmount,
      time: this._time,
    };
  }

  open() {
    this._openEventHandler();
    this._settingsElement.classList.add(this._settingsOpenClass);
  }

  close() {
    this._settingsElement.classList.remove(this._settingsOpenClass);
  }
}
