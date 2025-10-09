import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./Configs/connectDB.js";
import UserRouter from "./Routes/user.route.js";

const app = express();
app.use(cors({
    credentials : true ,
    origin : process.env.FRONTEND_URL || "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("combined"))
app.use(helmet({
    crossOriginResourcePolicy : false
}))

// Routes
app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

const PORT = process.env.PORT || 3001;
connectDB().then(()=>{
  app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`)
  })
})