import Recipe from "../models/recipe.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRecipe = async (req, res) => {
  const { recipeName, recipeDesc } = req.body;
  if ([recipeName, recipeDesc].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const recipe = await Recipe.create({
    recipeName,
    recipeDesc,
    recipeBy: req.user._id,
    recipeImage: `/uploads/${req.file.filename}`,
  });

  if (!recipe) {
    throw new ApiError(500, "Receipe not created!");
  }

  return res.redirect("/api/v1/recipe/create");
};
const createRecipe1 = async (req, res) => {
  return res.render("recipeCreate", {
    user: req.user,
  });
};

const homePage = async (req, res) => {
  return res.render("home", {
    user: req.user,
  });
};
const showAllRecipe = async (req, res) => {
  const recipe = await Recipe.find({}).populate("recipeBy");
  return res.render("show", {
    user: req.user,
    recipe,
  });
};

const deleteRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const recipe = await Recipe.findOne({
      $and: [{ _id }, { recipeBy: req.user._id }],
    });
    if (!recipe) {
      return res.redirect("/api/v1/recipe/show");
    }
    const deletedItem = await Recipe.findByIdAndDelete(_id);
    if (!deletedItem) {
      throw new ApiError(501, "Not Deleted Try Again Later");
    }
    return res.redirect("/api/v1/recipe/show");
  } catch (error) {
    console.log("Not deleted", error);
  }
};

const updateToRecipe = async (req, res) => {
  const _id = req.params.id;
  const recipe = await Recipe.findOne({
    $and: [{ _id }, { recipeBy: req.user._id }],
  });

  if (!recipe) {
    return res.redirect("/api/v1/recipe/show");
  }
  return res.render("updateRecipe", {
    recipe,
  });
};

const updateRecipe = async (req, res) => {
  const { recipeName, recipeDesc } = req.body;
  const _id = req.params.id;

  const updateRecipe = await Recipe.findByIdAndUpdate(
    _id,
    {
      $set: {
        recipeName,
        recipeDesc,
      },
    },
    {
      new: true,
    }
  );
  if (!updateRecipe) {
    return res.redirect("/api/v1/recipe/");
  }
  return res.redirect("/api/v1/recipe/show");
};

const viewSingleRecipe = async (req, res) => {
  const _id = req.params.id;
  const recipe = await Recipe.findById(_id).populate("recipeBy");
  if (!recipe) {
    return res.redirect("/api/v1/recipe/show");
  }
  return res.render("singleRecipe", {
    user: req.user,
    recipe,
  });
};

export {
  createRecipe,
  homePage,
  createRecipe1,
  showAllRecipe,
  deleteRecipe,
  updateRecipe,
  updateToRecipe,
  viewSingleRecipe,
};
