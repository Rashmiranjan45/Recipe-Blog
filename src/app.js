import express from "express";
import cookieParser from "cookie-parser";
import receipeRouter from "../routes/receipe.routes.js";
import userRouter from "../routes/user.routes.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/recipe", receipeRouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

export { app };
