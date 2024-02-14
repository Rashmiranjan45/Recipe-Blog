import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
