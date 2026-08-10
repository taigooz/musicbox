import express from "express";
import cors from "cors";

import db from "./database/database.js";
import albumRoutes from "./routes/albumRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/albums", albumRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});