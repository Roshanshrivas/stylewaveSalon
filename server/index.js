import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./config/database.js";
import userRouter from "./routes/user.route.js";
import serviceRoute from "./routes/service.route.js";
import slotRoute from "./routes/slot.route.js";
import bookRoute from "./routes/booking.routes.js";
import staffRoute from "./routes/staff.route.js";
import cors from "cors";


//Express
const app = express();

//Dotenv
dotenv.config();

//Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

//PORT Number
const PORT = process.env.PORT || 4000

//API Mount
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/slots", slotRoute);
app.use("/api/v1/booking", bookRoute);
app.use("/api/v1/staff", staffRoute);

//Database connection
connectDB();

//Server start
app.listen(PORT, ()=> {
    console.log(`Server Run on ${PORT}`);  
});