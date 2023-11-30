import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    //hash de los links a las recetas
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //1 Cargando receta
    await model.loadRecipe(id);

    //Mostrar receta en navegador. Llamado metodo render
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

["haschange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
