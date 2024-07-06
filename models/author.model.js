const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			trim: true,
			required: [true, "please enter full name"],
		},

		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
		nationality: String,
		books: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Book",
			},
		],
	},
	{ timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
