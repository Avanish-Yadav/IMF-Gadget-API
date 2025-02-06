const express = require("express");
const auth = require("../middleware/auth");
const {
  getGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  selfDestruct,
} = require("../controllers/gadgetsController");
const router = express.Router();

router.get("/", getGadgets);
router.post("/", auth, addGadget);
router.patch("/:id", auth, updateGadget);
router.delete("/:id", auth, deleteGadget);
router.post("/:id/self-destruct", auth, selfDestruct);

module.exports = router;
