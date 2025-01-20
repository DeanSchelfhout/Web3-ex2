require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./routes/auth");
const transactionsRouter = require("./routes/transactions");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Gebruik de variabele of de standaardwaarde
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);

module.exports = app;
