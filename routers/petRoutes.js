const express = require("express");
const router = express.Router();

const petsController = require("../controllers/petController");

router.get("/", petsController.getAllPets);
router.get("/type/:id", petsController.getTypeByID);
router.post("/add", petsController.addPet);
router.delete("/:id", petsController.deleteById);
router.put("/:id", petsController.editPet);

module.exports = router;
