const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user.js");
const accountRoutes = require("./routes/account.js");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);

const PORT = process.env.PORT;

app.listen(PORT);
