import View from './views';
import icons from 'url:../../img/icons.svg';

class UploadRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addhandlerShowWindow();
    this._addhandlerHideWindow();
  }

  toggleModalWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addhandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleModalWindow.bind(this));
  }

  _addhandlerHideWindow() {
    this._overlay.addEventListener('click', this.toggleModalWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleModalWindow.bind(this));
  }

  addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generatemarkup() {}
}

export default new UploadRecipeView();
