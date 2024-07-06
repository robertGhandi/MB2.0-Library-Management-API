const Book = require("../models/book.model");
const Author = require("../models/author.model");

const addBook = async (req, res) => {
	try {
		const {
			title,
			authorName,
			description,
			genres,
			publicationDate,
			copiesAvailable,
		} = req.body;
		const book = await Book.findOne({ title });

		if (book) {
			return res.status(409).json({
				status: "error",
				message: `Book with title ${title} already exists`,
			});
		}
		const author = await Author.findOne({ fullName: authorName });
		if (!author) {
			return res.status(404).json({
				status: "error",
				message: "Author not found",
			});
		}

		const newBook = new Book({
			title,
			author: author._id,
			description,
			genres,
			publicationDate,
			copiesAvailable,
		});

		await newBook.save();

		res.status(201).json({
			status: "success",
			message: "Book successfully added",
			data: newBook,
		});
	} catch (error) {
		res.json({
			status: "error",
			message: "unable to add book",
		});
		console.log(error);
	}
};

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find({}).populate("author");

		if (!books) {
			return res.status(404).json({
				status: "error",
				message: "no books found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Fetched all books successfully",
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Unable to fetch books",
		});
	}
};

const getSingleBook = async (req, res) => {
	try {
		const { bookId } = req.params;

		const book = await Book.findById(bookId).populate("author");

		if (!book) {
			return res.status(404).json({
				status: "error",
				message: `Book with id ${bookId} not found`,
			});
		}
		res.status(200).json({
			status: "success",
			message: "Books fetched successfully",
			data: book,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};

const updateBook = async (req, res) => {
	try {
		const { bookId } = req.params;

		const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
			new: true,
		}).populate("author");

		if (!updatedBook) {
			return res.status(404).json({
				status: "error",
				message: `Book with id ${bookId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			message: "book updated successfully",
			data: updatedBook,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to update book",
		});
	}
};

const deleteBook = async (req, res) => {
	try {
		const { bookId } = req.params;

		const deleteBook = await Book.findByIdAndDelete(bookId);

		if (!deleteBook) {
			return res.status(404).json({
				status: "error",
				message: "Book not found",
			});
		}
		res.status(204).json({
			status: "success",
			message: `Book with id = ${bookId} deleted successfully`,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to delete book",
		});
	}
};

const searchBook = async (req, res) => {
	try {
		const { title, author, genres } = req.query;

		let filters = {};

		if (title) filters.title = new RegExp(title, "i");
		if (author) filters.author = new RegExp(author, "i");
		if (genres) filters.nationality = genres;

		const books = await Book.find(filters);

		if (!books) {
			return res.status(404).json({
				status: "error",
				message: "no book found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "fetched books successfully",
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};

module.exports = {
	addBook,
	getAllBooks,
	getSingleBook,
	updateBook,
	deleteBook,
	searchBook,
};
