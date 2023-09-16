// Get the data from the database
const People = require("../models/peopleModel");

async function getAllPeople(req, res) {
  try {
    const results = await People.findAll();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getPersonsAge(req, res) {
  try {
    const personId = req.params.id;
    const person = await People.findByPk(personId);

    if (person === null) {
      res.status(404).json({ message: "The person was not found" });
      return;
    }

    res.json({ age: person.age });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function addPerson(req, res) {
  try {
    const person = req.body;

    if (
      person.owner_name == null ||
      person.location == null ||
      person.pet_id == null
    ) {
      res
        .status(400)
        .json({ message: "The person is missing some properties" });
    } else {
      const newPerson = await People.create(person);

      res.status(201).json(newPerson);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

function deletePerson(req, res) {
  const personId = req.params.id;

  People.destroy({ where: { id: personId } })
    .then((afterDeletion) => {
      if (afterDeletion === 0) {
        res.status(404).json({ message: "There was no person with that id" });
      } else {
        res.status(200).json({ message: "The person has been deleted" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
}

function editPerson(req, res) {
  const { id, owner_name, age, location, pet_id } = req.body;

  if (
    id === null ||
    owner_name === null ||
    location === null ||
    pet_id === null
  ) {
    res.status(400).json({
      message: "The person you are trying to add is missing some properties",
    });
  } else {
    People.update(
      { owner_name, age, location, pet_id },
      { where: { id: req.params.id } }
    )
      .then((response) => {
        if (response[0] === 0) {
          res.status(404).json({
            message: "The id you have inputted is not in the database",
          });
        } else {
          console.log(response);

          // res.status(200).json({message:"The edit worked"})

          res.status(200).redirect("/people");
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  }
}

module.exports = {
  getAllPeople,
  getPersonsAge,
  addPerson,
  deletePerson,
  editPerson,
};
