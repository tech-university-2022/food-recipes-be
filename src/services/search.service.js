// reloadSearchMaps is used to reload inverted index maps when the BE starts
const reloadSearchMaps = () => {
  // get all recipes
  // add recipe to 2 maps
};

// **** High priority ****
// fix get result bug
// fix data race bug
// implement reloadSearchMaps
// **** High priority ****

// **** Low priority ****
// O(1)
// O(n)
// BST -> Red and Black Tree O(logN)
// **** Low priority ****

// semaphore, binary semaphore
// atomic operation
// compareAndSwap
// critical resources - Mutex, semaphore
// 'flower' -> [idRecipe1, idRecipe2...]
const ingredientToIds = {};

// idRecipe1 -> objRecipe
const IdToRecipes = {};

const addRecipe = (recipe) => {
  IdToRecipes[recipe.id] = recipe;
};

const deleteRecipe = (id) => {
  delete IdToRecipes[id];
};

// add new recipe -> recipeId, ingredients recipes
// update ingredient recipe ->
// a b c d
// b c e f
// e f
// a
// race condition?
// mutex
const addIngredientsToRecipe = (recipeId, ingredients) => {
  ingredients.forEach((ingredient) => {
    if (!ingredientToIds[ingredient]) {
      ingredientToIds[ingredient] = [recipeId];
    } else {
      ingredientToIds[ingredient].push(recipeId);
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
