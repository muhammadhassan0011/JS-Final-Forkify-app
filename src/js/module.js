// import { async } from "regenerator-runtime";

import { API_URL, KEY, RES_PER_PAGE } from "./config.js";
import { AJAX, getJSON, sendJSON } from "./helpers.js";

// Adding --> Business logics ==:>  here :)
export const state = {
  // state should contain all the data about the Application__:>
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE, // 10
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // End Operator : short Circuits :> if(1 part) recipe.key is falsy/Doesn't exists then nothing happens here :>
    // if this is some value, then (2 part) of the operator is executed and returned __>    (IMPORTANT trick)
    ...(recipe.key && { key: recipe.key }), // (Trick : To conditionally add properties to an object)
  };
};

// NOTE : if you're using your own API key then of course you will not see this recipe here bcz this recipeis linked to my API key__ :>
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // Check if there's already recipe having same id in the bookmarks state ... if that's true then mark current recipe that we loaded from API as bookmarked set to true ...
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (Error) {
    // Temp Error Handling :__ >
    console.error(`${Error} ****:)`);

    // In helpers func__ whenever we got this error, then that error was not automatically propagated down to model's(async func__) which was calling the hetJSON func__..  THEREFORE we Need to Re-throw Error Here :>>
    throw Error;
    // To mark this whole promise here, as rejected, So that Then here(module.js), we would get into catch block__>
  }
};

// Creating  function that will be exported, So that it can be used by the controller...
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    // Array of all the objects, now we need to create new array which contains the new Objects where property names are different :>
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // (Trick : To conditionally add properties to an object)
      };
    });
    state.search.page = 1; //  while doing new search page will reset to 1 :>
    // console.log(state.search.results);
  } catch (Error) {
    console.error(`${Error} ****:)`);
    throw Error;
  }
};

// Creating func__ which will take in the page that we want to render & which will then only return the results that we actually want to render for that page :)
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // First Page : return From result 1 to 10;  (0 to 9) cuz [Array is 0 based]
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// Function will reach into the state, and in particular into the recipe ingrediets, and then change the quantity in each ingredient ...
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    // newQt = oldQt * newServings / oldServigs   //            2 * 8 / 4 = 4
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    state.recipe.servings = newServings;
  });
};

// 1st : get bookmarks out of the local storage & render them to the bookmarksView ___ :>
const presistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// ADDING BOOKMARKS to the RECIPE ___ :)
export const addBookmarks = function (recipe) {
  // ADD bookmark :>
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark :>
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  presistBookmarks();
};

// DELETING BOOKMARKS FROM the RECIPE ___ :)
export const deleteBookmark = function (id) {
  // Delete bookmark :)
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT a bookmark (any more):>
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  presistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// For clearing bookmarks ! :>
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmarks()

export const uploadRecipe = async function (newRecipe) {
  try {
    // 1 task : take the raw input data and transform it into same format as the data that we get from API :>
    // We want :1 part>  only the entries where first Ele of arr starts with ingredient / 2 part> should not be empty__:)
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        // if array has length of 3 :>
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Plz use the Correct Format :("
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      }); // opposite of Object.fromEntries() :>

    // Creating Object that is ready to be uploaded __ > sending this to API :>
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data); //
    addBookmarks(state.recipe);
  } catch (Error) {
    throw Error; // this will throw Error message  ___ >
  }
};
