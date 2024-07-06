const {
	loanBook,
	getLoanList,
	getSingleLoan,
	updateLoan,
	deleteLoan,
} = require("../controllers/loan.controller");

const { validateLoan } = require("../validators/loan.validator");
const { auth, verifyAdmin } = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/", [auth, verifyAdmin], getLoanList);
router.get("/:loanId", [auth, verifyAdmin], getSingleLoan);
router.post("/", [auth, verifyAdmin], validateLoan, loanBook);
router.put("/:loanId", [auth, verifyAdmin], updateLoan)
router.delete("/:loanId", [auth, verifyAdmin], deleteLoan);

module.exports = router;
