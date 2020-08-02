class Screen {
  constructor(screenSelectors, screenOpenedClass) {
    this._screens = {
      start: document.querySelector(screenSelectors.start),
      process: document.querySelector(screenSelectors.process),
      end: document.querySelector(screenSelectors.end),
    };
    this._openedClass = screenOpenedClass;
  }

  switchScreen(activeScreen) {
    for (let type in this._screens) {
      if (type === activeScreen) {
        this._screens[type].classList.add(this._openedClass);
      } else {
        this._screens[type].classList.remove(this._openedClass);
      }
    }
  }
}

export default Screen;
