import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

dotenv.config();

console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

app.use(cors({
    origin: ['https://notes-vault-nbw99st1o-shubham-thakurs-projects-d475b917.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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