// import { mark } from "regenerator-runtime";
import icons from "url:../../img/icons.svg"; // .. means to go to parent folder ___ : Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    // If there is no data OR there is data in array, but that data is an Array, & it's Empty :)   Error To be Shown :>>>
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // CANNOT UNDERSTAND :(
  // update Method :> will only update text & attributes in DOM , without having to re-render the entire view...
  update(data) {
    // In This Method, We will create newMarkup but not render it. Instead : We Generate this Markup & then compare that new HTML to current HTML... then change text , Attributes that actully   have changed from the old version to the new version ... >>>
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converting newMarkup to DOM Object :>
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // then compare it with actual DOM that's on the page :)
    const newElements = Array.from(newDOM.querySelectorAll("*")); // * for selecting all elements __>
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(currElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      // console.log(curEl, newEl.isEqualNode(curEl));

      // Comparing currEl with newEl ( using : isEqualNode __) && Only want elements that are TEXT  :>
      // Update changed TEXT :>
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("$$ :>", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES :> Replacing all Attributes in the current elemet by attributes comming from the new element ...
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  } // CANNOT UNDERSTAND (REVIEW THIS CODE LATER):(

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  // Error Message
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Success Message
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${icons}#icon-smile"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
