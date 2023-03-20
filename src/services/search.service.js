// reloadSearchMaps is used to reload inverted index maps when the BE starts
const reloadSearchMaps = () => {
  // get all recipes
  // add recipe to 2 maps
};

// **** High priority ****
// fix get result bug [x]
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
    } else if (!ingredientToIds[ingredient].includes(recipeId)) {
      // Avoid adding duplicated recipes
      ingredientToIds[ingredient].push(recipeId);
    }
  });
};

const deleteIngredientsFromRecipe = (recipeId, ingredients) => {
  ingredients.forEach((ingredient) => {
    if (ingredientToIds[ingredient]) {
      const currentRecipeIds = ingredientToIds[ingredient];
      // remove recipeId from ingredient map (currently O(n), can be optimized to O(logN))
      // we can use BST (Red and Black tree) here for O(logN) operation

      const recipeIndex = currentRecipeIds.indexOf(recipeId);

      if (recipeIndex >= 0) {
        currentRecipeIds.splice(recipeIndex, 1);
      }

      ingredientToIds[ingredient] = currentRecipeIds;
    }
  });
};

const intersect = (...arrays) => (
  arrays.length === 0 ? []
    : arrays.reduce((a, b) => a.filter((c) => b.includes(c)))
);

const searchByIngredients = (ingredients) => {
  // Map each ingredients to list of recipeIds, then intersect them and map to recipes
  const recipes = intersect(
    ingredients
      .map((ingredient) => {
        const recipeIds = ingredientToIds[ingredient];
        return recipeIds || [];
      }),
  ).map((recipeId) => IdToRecipes[recipeId]);

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
