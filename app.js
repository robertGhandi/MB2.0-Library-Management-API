require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const authorRoutes = require("./routes/author.routes");
const loanRoutes = require("./routes/loan.routes")
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/loans", loanRoutes);

const startServer = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("Connected to database!");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error.message);
	}
};
startServer();
