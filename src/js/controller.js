import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
const recipeContainer = document.querySelector(".recipe");

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
