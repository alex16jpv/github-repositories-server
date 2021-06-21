require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { repositoriesIndex } = require("./routes/controllers/repositoriesIndex");
const { login, signup } = require("./routes/controllers/auth");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.post("/auth/login", login);
app.post("/auth/signup", signup);
app.get("/repositories/:username/:limit", repositoriesIndex);

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
