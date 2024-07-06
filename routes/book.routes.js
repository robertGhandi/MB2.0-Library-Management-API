const {
	addBook,
	getAllBooks,
	getSingleBook,
	updateBook,
	deleteBook,
	searchBook,
} = require("../controllers/book.controller");

const { auth, verifyAdmin } = require("../middleware/auth.middleware")
const express = require("express");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookId", getSingleBook);
router.get("/search", searchBook)
router.post("/", [auth, verifyAdmin], addBook);
router.put("/:bookId", [auth, verifyAdmin], updateBook);
router.delete("/:bookId", [auth, verifyAdmin], deleteBook);

module.exports = router;
