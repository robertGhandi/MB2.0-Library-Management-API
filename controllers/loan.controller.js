const Loan = require("../models/loan.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const loanBook = async (req, res) => {
	try {
		const { email, bookTitle } = req.body;

		const book = await Book.findOne({ title: bookTitle });
		if (!book) {
			return res.status(404).json({
				status: "error",
				message: "Book not found",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "User not found",
			});
		}

		const loanBook = new Loan({
			book: book._id,
			user: user._id,
			
			returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days later
		});
		await loanBook.save();

		res.status(201).json({
			status: "success",
			message: "loan created successfully",
			data: loanBook,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to create loan",
		});
		console.log(error.message)
	}
};

const getLoanList = async (req, res) => {
	try {
		const LoanList = await Loan.find({}).populate("user");

		if (!LoanList) {
			return res.status(400).json({
				status: "error",
				message: "no list to retrieve",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Loan List successfully retrieved",
			data: LoanList,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to retrieve loan list",
		});
	}
};

const getSingleLoan = async (req, res) => {
	try {
		const { loanId } = req.params;

		const loanedBook = await Loan.findById(loanId).populate("user");

		if (!loanedBook) {
			return res.status(404).json({
				status: "error",
				message: "not found",
			});
		}

		res.status(200).json({
			status: "error",
			message: "successfully retrieved",
			data: loanedBook,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};

const updateLoan = async (req, res) => {
	try {
		const { loanId } = req.params;

		const updateLoan = await Loan.findByIdAndUpdate(loanId, req.body, {
			new: true,
		}).populate("user");
		if (!updateLoan) {
			return res.status(404).json({
				status: "error",
				message: `loan with id = ${loanId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			message: `loan with id = ${loanId} updated successfully`,
			data: updateLoan,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
		});
	}
};

const deleteLoan = async (req, res) => {
	try {
		const loanId = req.params.loanId;

		const loan = await Loan.findByIdAndDelete(loanId);

		if (!loan) {
			return res.status(404).json({
				status: "error",
				message: "loan not found",
			});
		}

		if (loan.returned === false) {
			return res.status(400).json({
				status: "error",
				message: "book not returned",
			});
		}

		res.status(204).json({
			status: "success",
			message: "loan deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to delete loan",
		});
	}
};

module.exports = {
	loanBook,
	getLoanList,
	getSingleLoan,
	updateLoan,
	deleteLoan,
};
