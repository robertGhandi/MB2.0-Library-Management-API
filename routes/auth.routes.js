const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validateUser } = require("../validators/register.validator");
const { validateLoginUser } = require("../validators/login.validator");
const express = require("express");
const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateLoginUser, loginUser);

module.exports = router;
