const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const accountRoutes = require("./routes/account.js");

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);

const PORT = process.env.PORT;

app.listen(PORT);
