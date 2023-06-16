const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const personRouter = require("./controllers/person");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

const url = config.MONGODB_URI;

mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

app.use(express.json());
app.use(cors());

app.use(middleware.errorHandler);

app.use("/api/persons", personRouter);

app.use(middleware.requestLogger);

const PORT = 5000;
app.listen(PORT, () => logger.info(`Running on port ${PORT}`));
