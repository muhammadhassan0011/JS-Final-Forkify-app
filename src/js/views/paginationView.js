//  PAGINATION :>
// FIRST Senerio , Page 1 then only next button(Page 1) is Shown & No button to (GO back) __>
// SECOND Senerio ,  IF we have less then 10 Results then we have (No buttons At All) ___ >
// THIRD Senerio ,  We are in Other Page That NOt First Page theN Both Buttons Should be Shown (Button : Go Forward) & (Button : Go Back)
// FOURTH Senerio , if we Go to last Page then Only (GO back)button should be Shown :)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import View from "./View.js";

import icons from "url:../../img/icons.svg"; // .. means to go to parent folder ___ : Parcel 2
// import { Fraction } from "fractional";
// console.log(Fraction);  // not working !

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  // Using PublisherSubcriber pattren : like recipeView :>
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  // Metod that render method is going to call to generate the markup for the View ;
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // ----------------- > CHALLENGE : # REFRACTURE the buttons code into Method(generateMarkupButton) :>>>
    // Page 1, and there are other pages : Current Page need to be less then number of Pages ___ >

    //  <!-- creating data-attribute on each btns,which contains the page that we want to go to  -->
    if (currPage === 1 && numPages > 1) {
      return ` <button data-goto="${
        currPage + 1
      }"  class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Last Page :  current PAGE is same As Number of Pages :>
    if (currPage === numPages && numPages > 1) {
      return ` <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
    }

    // Other Page : Current Page less then number of Pages :>
    if (currPage < numPages) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
           <button data-goto="${
             currPage + 1
           }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // Page 1, and there are No other pages :
    return "";
  }
}

export default new PaginationView();
