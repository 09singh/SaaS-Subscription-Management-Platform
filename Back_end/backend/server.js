import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import mongoose from "mongoose";
import planRoutes from "./routes/admain/plans.js";
import companyRoutes from "./routes/admain/companys.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

//mongos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connecteddb"))
    .catch((err) => console.log(err));

app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running. Send a POST request to /login.",
    });
});


app.use("/api/auth", login);
app.use("/api/auth", register);
app.use("/api/admin", planRoutes);
app.use("/api/admin", companyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});