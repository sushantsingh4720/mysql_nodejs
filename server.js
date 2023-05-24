import express from "express";
import { config } from "dotenv";
import cors from "cors";
import employeeRoutes from "./routes/employee.js";
const app = express();
config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is working" });
});

app.use("/api/employee", employeeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
