const Pets = require("../models/petModel");

async function getAllPets(req, res) {
  try {
    res.status(200).json(await Pets.findAll());
  } catch {
    res.status(500).json({ message: error });
  }
}

async function getTypeByID(req, res) {
  try {
    const pet = await Pets.findByPk(req.params.id);
    res.status(200).json({ type: pet.type });
  } catch {
    res.status(500).json({ message: error });
  }
}

async function addPet(req, res) {
  try {
    const newPet = await Pets.create(req.body);

    res.status(201).json(newPet);
  } catch {
    res.status(500).json({ message: error });
  }
}
async function deleteById(req, res) {
  try {
    res.status(200).json(await Pets.destroy({ where: { id: req.params.id } }));
  } catch {
    res.status(500).json({ message: error });
  }
}
async function editPet(req, res) {
  const { pet_name, type } = req.body;
  if (pet_name === null || type === null) {
    res.status(400).json({
      message: "The person you are trying to add is missing some properties",
    });
  } else {
    try {
      Pets.update({ pet_name, type }, { where: { id: req.params.id } });
    } catch {
      res
        .status(500)
        .json({ message: error })
        .then((response) => {
          if (response[0] === 0) {
            res.status(404).json({
              message: "The id you have inputted is not in the database",
            });
          } else {
            console.log(response);

            // res.status(200).json({message:"The edit worked"})

            res.status(200).redirect("/pets");
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    }
  }
}
module.exports = { getAllPets, getTypeByID, addPet, deleteById, editPet };
