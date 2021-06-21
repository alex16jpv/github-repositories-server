const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("nanoid");
const db = lowDb(new FileSync("db.json"));
db.defaults({ users: [] }).write();

const getUsers = () => db.get("users").value();

const login = (req, res) => {
  const body = req.body;
  let errorMessage = "";
  let error = false;
  if (!body.password || !body.username) {
    error = true;
    errorMessage = "username and password are required";
  } else {
    const data = getUsers();
    const foundUser = data.find(
      (user) =>
        user.username === body.username && user.password === body.password
    );

    if (!foundUser) {
      error = true;
      errorMessage = "Sorry, your info was incorrect";
    }
  }

  res.send({
    error,
    errorMessage,
  });
};

const signup = ({ body }, res) => {
  let errorMessage = "";
  let error = false;
  if (!body.password || !body.username) {
    error = true;
    errorMessage = "username and password are required";
  } else {
    const data = getUsers();
    const foundUser = data.find((user) => user.username === body.username);
    if (foundUser) {
      error = true;
      errorMessage = "User already exists!";
    } else {
      db.get("users")
        .push({
          ...body,
          id: nanoid(),
        })
        .write();
    }
  }
  res.send({
    error,
    errorMessage,
  });
};

exports.login = login;
exports.signup = signup;
