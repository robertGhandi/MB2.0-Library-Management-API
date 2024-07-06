const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
	try {
		const { email } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(409).json({
				status: "error",
				message: "user already exists",
			});
		}

		const newUser = await User.create(req.body);
		res.status(201).json({
			status: "success",
			message: "user created successfully",
			data: newUser,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "An error occurred while creating user",
		});
		console.log(error.message)
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "user not found",
			});
		}

		const passwordMatch = bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({
				status: "error",
				message: "Invalid email or password",
			});
		}

		// Generate jwt token
		const payload = {
			id: user._id,
			lastName: user.lastName,
		};
		const token = jwt.sign(payload, "1234!@#$%<{*&)", { expiresIn: "1h" });

		res.status(200).json({
			status: "success",
			message: "login successful",
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to login ",
		});
	}
};

module.exports = { registerUser, loginUser };
