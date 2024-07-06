const Author = require("../models/author.model");
const Book = require("../models/book.model")

const getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.find({}).populate("books");

		if (!authors) {
			return res.status(404).json({
				status: "error",
				message: "Authors not found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Authors fetched successfully",
			data: authors,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to fetch authors",
		});
	}
};

const addAuthor = async (req, res) => {
	try {
		const { fullName, gender, nationality, bookTitle } = req.body;

		const author = await Author.findOne({ fullName });

		if (author) {
			return res.status(409).json({
				status: "error",
				message: "author already exists",
			});
		}

		const book = await Book.find({ title: bookTitle })

		const newAuthor = await Author.create({
			fullName,
			gender,
			nationality,
			books: book.title,
		});

		res.status(201).json({
			status: "success",
			message: "author added successfully",
			data: newAuthor,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "error creating author",
		});
	}
};

const getSingleAuthor = async (req, res) => {
	try {
		const { authorId } = req.params;

		const author = await Author.findById(authorId).populate("books");

		if (!author) {
			return res.status(404).json({
				status: "error",
				message: "no author found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "author retrieved successfully",
			data: author,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};

const updateAuthor = async (req, res) => {
	try {
		const { authorId } = req.params;

		const updatedAuthor = await Author.findByIdAndUpdate(
			authorId,
			req.body,
			{ new: true }
		).populate("books");

		if (!updatedAuthor) {
			return res.status(404).json({
				status: "error",
				message: "no author found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Author updated successfully",
			data: updatedAuthor,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};

const deleteAuthor = async (req, res) => {
	try {
		const { authorId } = req.params;

		const deleteAuthor = await Author.findByIdAndDelete(authorId);

		if (!deleteAuthor) {
			return res.status(404).json({
				status: "error",
				message: "no author found",
			});
		}

		res.status(204).json({
			status: "success",
			message: "author successfully deleted",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to delete author",
		});
	}
};

module.exports = {
	getAllAuthors,
	addAuthor,
	getSingleAuthor,
	updateAuthor,
	deleteAuthor,
};
