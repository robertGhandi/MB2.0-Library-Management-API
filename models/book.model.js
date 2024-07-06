const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please enter book title"],
		},
		
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
			required: true,
		},
		description: {
			type: String,
		},
		genres: [String],
		publicationDate: {
			type: Date,
			required: true,
		},
		copiesAvailable: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
