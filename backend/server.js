import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

dotenv.config();

console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected To MongoDB");
    
    app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
});

})
.catch((error) => {
    console.log("MongoDb connection Error:", error);
});
 
export default app;