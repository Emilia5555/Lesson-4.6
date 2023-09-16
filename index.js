/// have a database with people and pet tables
// database name => animal lovers
// people table: id, owner's name, age, location, pet
// pets table: id, pet name, type

const express = require("express");
const app = express();
const port = 3000;

const peepsRoutes = require("./routers/peopleRoutes");
const petRoutes = require("./routers/petRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("This is our home route");
});

app.use("/people", peepsRoutes);

//TODO -  CREATE Pets route, controller

app.use("/pets", petRoutes);

app.listen(port, () => {
  console.log("My server is working");
});
