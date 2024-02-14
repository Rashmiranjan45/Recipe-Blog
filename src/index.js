import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "../db/index.js"

dotenv.config({
    path:"./.env"
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 4001 , () => {
        console.log(`server started on port:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("ERROR :: MONGODB CONNECTION FAILED",err)
})

