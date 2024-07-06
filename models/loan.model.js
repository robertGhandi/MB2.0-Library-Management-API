const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
	{
		
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		
	
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		loanDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		dueDate: {
			type: Date,
			
		},
		returned: {
			type: Boolean,
			default: false,
		},
		returnDate: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
module.exports = Loan;
