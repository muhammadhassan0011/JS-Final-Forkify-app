import * as model from "./module.js"; // importing everyThing from model.js :>
import recipeView from "./views/recipeView.js";
import { MODEL_CLOSE_SEC } from "./config.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// import icons from "url:../img/icons.svg"; // .. means to go to parent folder ___ : Parcel 2
// console.log(icons);
import "core-js/stable";
import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

//////////////////////////////////////////////////////////////////////////////////////////

// Activating Hot Module Reloding :
if (module.hot) {
  module.hot.accept();
}

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result :>
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe :>
    await model.loadRecipe(id); // using await cuz it returns promise :)

    // 2:) Rendering recipe :>
    recipeView.render(model.state.recipe);

    // 3:)  Updating bookmarks View : >
    bookmarksView.update(model.state.bookmarks);
  } catch (Error) {
    recipeView.renderError(); // where we going to get Error from :>
    console.error(Error);
  }
};

const controllSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query :)
    const query = searchView.getQuery();
    if (!query) return; // if No query then return immediately :>

    // 2) Load search results :>
    await model.loadSearchResults(query);

    // 3) Render results :)
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial Pagination Buttons :>
    paginationView.render(model.state.search);

    // 1) Render NEW results :)

    // 2) Render NEW Pagination Buttons :>
  } catch (Error) {
    console.log(Error);
  }
};
// controllSearchResults();

const controllPagination = function (goToPage) {
  // 1) Render NEW results :)
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render NEW Pagination Buttons :>
  paginationView.render(model.state.search);
};

const controllServings = function (newServings) {
  // Update the recipe servings (in state) :>
  model.updateServings(newServings); //  ==>  btn.dataset

  // Update the recipe view
  // recipeView.render(model.state.recipe);

  // update Method :> will only update text & attributes in DOM , without having to re-render the entire view...
  recipeView.update(model.state.recipe);
};

// When ever a New Bookmark is added, we want to render the bookmarks view with all the bookmarks..
const controllAddBookmark = function () {
  // 1) ADD/ REMOVE bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Render bookmarks   :>
  bookmarksView.render(model.state.bookmarks);
  // console.log(model.state.recipe);
  // 3) Update recipe view :>
  recipeView.update(model.state.recipe);
};

const controllbookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// func__ will recieve the new recipe data :>
const controllAddRecipe = async function (newRecipe) {
  try {
    // Adding loading spinner :>
    addRecipeView.renderSpinner();
    // Upload new recipe data :>
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe :>
    recipeView.render(model.state.recipe); // And also close Form to see the recipe :<

    // Success Message :>
    addRecipeView.renderMessage();

    // Render Bookmark view :>
    bookmarksView.render(model.state.bookmarks);

    // change ID in URL :>  history.pushState : allow us to change the url without reloading the page :>
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // window.history.back()    for going back to last page :>

    // Close Form Window :>
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (Error) {
    console.error("***", Error);
    addRecipeView.renderError(Error.message); // this will throw Error message  ___ >
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controllbookmarks);
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(controllServings);
  recipeView.addHandlerAddBookmark(controllAddBookmark);
  searchView.addHandlerSearch(controllSearchResults);
  paginationView.addHandlerClick(controllPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};
init();

//  func__ which we call at some point ___

//

// window.addEventListener("hashchange", controllRecipes);
// window.addEventListener("load", controllRecipes);

// instead we do this : ===>

// Problem : we dont want this code in controller , but in the recipeView. But in this code,we need this controllerRecipe func__ :<
// Summary :> The handler subcribes to the publisher, which is the listener in this case, and then as the publisher publishes an event, the subcriber is executed.
