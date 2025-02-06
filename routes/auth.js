const express = require("express");
const auth = require("../middleware/auth");
const {
  register, login
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
