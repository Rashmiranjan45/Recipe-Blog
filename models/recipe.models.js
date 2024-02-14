import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      require: true,
      required:true
    },
    recipeDesc: {
      type: String,
      require: true,
    },
    recipeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipeImage:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
