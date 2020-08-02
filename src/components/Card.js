export default class Card {
  constructor({
    containerSelector,
    messageSelector,
    indicatorSelector,
    indicatorContainerSelector,
    tellResults,
    showNextItem,
  }) {
    this._container = document.querySelector(containerSelector);
    this._messageSelector = messageSelector;
    this._indicatorSelector = indicatorSelector;
    this._indicatorContainerSelector = indicatorContainerSelector;
    this._tellResults = tellResults;
    this._showNextItem = showNextItem;
    this._counter = 0;
  }

  _getTemplate(templateSelector, elementSelector) {
    const cardElement = document
      .querySelector(templateSelector)
      .content.querySelector(elementSelector)
      .cloneNode(true);
    return cardElement;
  }

  setItem(element) {
    this._container.append(element);
  }

  itemPositionCounter() {
    return (this._counter += 1);
  }

  checkIfItemsLeft(length) {
    this.itemPositionCounter();
    if (this._counter > length) {
      this.clear();
      this._counter = 0;
      return this._tellResults();
    } else {
      return this._showNextItem();
    }
  }

  showMessage(message, header, actionText) {
    this._message = this._getTemplate(this._messageSelector, '.message');
    this._messageHeader = this._message.querySelector('.message__header');
    this._messageText = this._message.querySelector('.message__text');
    this._messageButton = this._message.querySelector('.message__action');
    this._messageHeader.textContent = header;
    this._messageText.textContent = message;
    this._messageButton.textContent = actionText;
    this.setItem(this._message);
  }

  createIndicatorsContainer() {
    this._indicatorContainer = this._getTemplate(
      this._indicatorContainerSelector,
      '.indicator-container'
    );
    this.setItem(this._indicatorContainer);
  }

  indicate(flag) {
    this._answerIndicator = this._getTemplate(
      this._indicatorSelector,
      '.indicator'
    );
    flag
      ? this._answerIndicator.classList.add('indicator_type_right')
      : this._answerIndicator.classList.add('indicator_type_wrong');
    this._indicatorContainer.append(this._answerIndicator);
  }

  clear() {
    this._container.innerHTML = '';
  }
}
