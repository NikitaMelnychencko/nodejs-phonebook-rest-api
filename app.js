const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./libs/limiter");
let uri;

const { URI_DB, URI_DB_TEST, PORT = 3500 } = process.env;

if (process.env.NODE_ENV === "test") {
  uri = URI_DB_TEST;
} else {
  uri = URI_DB;
}

const contactsRouter = require("./routes/api/contact/contacts");
const authRouter = require("./routes/api/auth/index");
const userRouter = require("./routes/api/user/index");

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(limiter(15 * 60 * 1000, 1000));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.STATIC_FOLDER));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
