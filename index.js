import express from "express"
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use("/api/v1", router);

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("DB Connection Established."))
.catch((err) => console.log("DB Error ==>", err));

app.listen(process.env.PORT, ()=> console.log(`Working on port ${process.env.PORT}`));