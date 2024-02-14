import { Router } from "express";
import {
  createRecipe,
  createRecipe1,
  deleteRecipe,
  homePage,
  showAllRecipe,
  updateRecipe,
  updateToRecipe,
  viewSingleRecipe,
} from "../controller/receipe.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { uploads } from "../middlewares/multer.middleware.js";
import {
  createComment,
  makeComment,
} from "../controller/comment.controller.js";

const router = Router();

router
  .route("/create")
  .post(verifyJWT, uploads.single("recipeImage"), createRecipe);
router.route("/create").get(createRecipe1);
router.route("/").get(homePage);
router.route("/show").get(verifyJWT, showAllRecipe);
router.route("/delete/:id").get(verifyJWT, deleteRecipe);
router.route("/update/:id").get(verifyJWT, updateToRecipe);
router.route("/update/:id").post(uploads.single("recipeImage"), updateRecipe);
router.route("/view/:id").get(viewSingleRecipe);
router.route("/view/:id").post(createComment);

router.route("/comments/:id").get(makeComment);
router.route("/comments/:id").post(verifyJWT, createComment);
// router.route("/api/v1/recipe/ErrorPage").get(verifyJWT);

export default router;
