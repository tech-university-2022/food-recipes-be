// reloadSearchMaps is used to reload inverted index maps when the BE starts
const reloadSearchMaps = () => {

};

const ingredientToIds = {};
const IdToRecipes = {};

const addRecipe = (recipe) => {
  IdToRecipes.set(recipe.id, recipe);
};

const deleteRecipe = (id) => {
  IdToRecipes.delete(id);
};

const addIngredientsToRecipe = (recipeId, ingredients) => {
  ingredients.forEach((ingredient) => {
    if (!ingredientToIds[ingredient]) {
      ingredientToIds[ingredient] = [recipeId];
    } else {
      ingredientToIds[ingredient] = [...ingredientToIds[ingredient], recipeId];
    }
  });
};

const deleteIngredientsFromRecipe = (recipeId, ingredients) => {
  ingredients.forEach((ingredient) => {
    if (ingredientToIds[ingredient]) {
      const curIds = ingredientToIds[ingredient];
      // remove recipeId from ingredient map (currently O(n), can be optimized to O(logN))
      // we can use BST (Red and Black tree) here for O(logN) operation
      let i = 0;
      while (i < curIds.length) {
        if (curIds[i] === recipeId) {
          curIds.splice(i, 1);
        } else {
          i += 1;
        }
      }
      ingredientToIds[ingredient] = curIds;
    }
  });
};

// TODO: resolve bug behavior
const searchByIngredients = (ingredients) => {
  const recipes = [];
  const idMap = {};
  for (let i = 0; i < ingredients.length; i += 1) {
    if (!ingredientToIds[ingredients[i]]) {
      return [];
    }
    const curIds = ingredientToIds[ingredients[i]];
    curIds.forEach((id) => {
      if (!idMap[id]) {
        recipes.push(IdToRecipes[id]);
        idMap[id] = true;
      }
    });
  }
  return recipes;
};

module.exports = {
  searchByIngredients,
  addIngredientsToRecipe,
  deleteIngredientsFromRecipe,
  addRecipe,
  deleteRecipe,
  reloadSearchMaps,
};
