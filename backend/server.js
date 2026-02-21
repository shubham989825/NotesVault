import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/note.js";

console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

const PORT = process.env.PORT || 10000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors({
    origin: ['https://notes-vault-3n61kopv1-shubham-thakurs-projects-d475b917.vercel.app', 'https://notesvault.vercel.app', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected To MongoDB");

})
.catch((error) => {
    console.log("MongoDb connection Error:", error);
});

 
export default app;