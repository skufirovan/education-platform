import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed:", error);
  }
});
