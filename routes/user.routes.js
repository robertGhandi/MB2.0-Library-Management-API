const {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
	searchUser,
} = require("../controllers/user.controller");

const { auth, verifyAdmin } = require("../middleware/auth.middleware")
const express = require("express");
const router = express.Router();

router.get("/", [auth, verifyAdmin], getAllUsers)
router.get("/:userId", [auth, verifyAdmin], getSingleUser)
router.get("/search", [auth, verifyAdmin], searchUser);
router.put("/:userId", [auth, verifyAdmin], updateUser);
router.delete("/:userId", [auth, verifyAdmin], deleteUser);

module.exports = router;
