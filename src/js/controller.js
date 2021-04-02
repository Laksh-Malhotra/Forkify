import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config';
import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarkView from './views/bookmarkView';
import UploadRecipeView from './views/uploadView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();

    ResultView.update(model.loadResultsPage());

    BookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();

    const query = SearchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //   ResultView.render(model.state.search.results);
    ResultView.render(model.loadResultsPage());

    PaginationView.render(model.state.search);
  } catch (err) {
    ResultView.renderError();
  }
};

const controlPagination = async function (goToPage) {
  ResultView.render(model.loadResultsPage(goToPage));

  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  RecipeView.update(model.state.recipe);

  BookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    UploadRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    RecipeView.render(model.state.recipe);

    UploadRecipeView.renderMessage();

    BookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      UploadRecipeView.toggleModalWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    UploadRecipeView.renderError(err.message);
  }
};

const init = function () {
  UploadRecipeView.addHandlerUploadRecipe(controlAddRecipe);

  BookmarkView.addHandlerBookmark(controlBookmarks);

  PaginationView.addHandlerClick(controlPagination);

  RecipeView.addHandlerBookmark(controlAddBookmark);

  RecipeView.addHandlerRender(controlRecipe);

  RecipeView.addHandlerUpdate(controlServings);

  SearchView.addHandlerRender(controlSearchResults);
};
init();
