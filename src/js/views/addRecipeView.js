///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import View from "./View.js";

import icons from "url:../../img/icons.svg"; // .. means to go to parent folder ___ : Parcel 2
// import { Fraction } from "fractional";
// console.log(Fraction);  // not working !

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = `Recipe was sucessfully uploaded :)`;

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      //  Using form data API  :=> in API pass in the element this a form == is ..(this) ..

      // Spreading the Object into Array :>
      const dataArr = [...new FormData(this)];
      // Method : to convert entries into an Object __>
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
