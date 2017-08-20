const express = require("express");
const app = express();

const mustacheExpress = require("mustache-express");

const data = require("./data");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("Public"));

app.get("/", (req, res) => {
    res.redirect('/robots')
})

app.get("/robots", (req, res) => {
  res.render("robots", {robots:data.users});
});

app.get("/robots/:name", (req, res) => {
  let chosenRobot = {};
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].name === req.params.name) {
      chosenRobot = data.users[i];
    }
  }
  res.render("singleRobot", chosenRobot);
})

app.listen(3000, function () {
  console.log("Successfully started application on localhost:3000.");
});