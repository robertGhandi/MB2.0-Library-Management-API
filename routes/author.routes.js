const {
	getAllAuthors,
	getSingleAuthor,
	addAuthor,
	updateAuthor,
	deleteAuthor,
} = require("../controllers/author.controller");

const { auth, verifyAdmin } = require("../middleware/auth.middleware")
const { validateAuthor } = require("../validators/author.validate")
const express = require("express");
const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:authorId", getSingleAuthor);
router.post("/", [auth, verifyAdmin], validateAuthor, addAuthor);
router.put("/:authorId", [auth, verifyAdmin], updateAuthor);
router.delete("/:authorId", [auth, verifyAdmin], deleteAuthor)

module.exports = router;
