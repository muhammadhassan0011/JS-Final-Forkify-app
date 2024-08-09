import View from "./View.js";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipies Found for your query! Please try Again :(";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
} // Want to Return Whole String which contains like one of these elements forEach of search results in Array...

export default new ResultsView();
