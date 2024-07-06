const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "please enter full name"],
		},

		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, "please enter email"],
		},
		password: {
			type: String,
			min: 8,
			required: true,
		},
		phone: {
			type: String,
			unique: true,
			required: [true, "phone number needed"],
		},
		joined: {
			type: Date,
			default: Date.now(),
		},
		borrowedBooks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Loan",
			},
		],
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
