const User = require("../models/user.model");


const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});

		if (!users) {
			return res.status(404).json({
				status: "error",
				message: "no user found",
			});
		}

		

		res.status(200).json({
			status: "success",
			message: "users retrieved successfully",
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to fetch users",
		});
	}
};

const getSingleUser = async (req, res) => {
	try {
		const { userId } = req.params

		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({
				status: "error",
				message: `user with id = ${userId} not found`
			})
		}

		res.status(200).json({
			status: "success",
			message: "user fetched successfully",
			data: user
		})
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to fetch user"
		})
	}
}

const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;

		const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
		});

		if (!updatedUser) {
			return res.status(404).json({
				status: "error",
				message: `user with id = ${userId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			message: "user updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "error updating user",
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;

		const deleteUser = await User.findByIdAndDelete(userId);

		if (!deleteUser) {
			return res.status(404).json({
				status: "error",
				message: `user with id = ${userId} not found`,
			});
		}

		res.status(204).json({
			status: "success",
			message: "user deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "unable to delete user ",
		});
	}
};

const searchUser = async (req, res) => {
	try {
		const { fullName } = req.query;

		let filters = {};

		if (fullName) filters.fullName = new RegExp(fullName, "i");

		const users = await User.find(filters);

		if (!users) {
			return res.json({
				status: "",
				message: "no user found",
			});
		}
		res.status(200).json({
			status: "success",
			message: "users retrieved successfully",
			data: users,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "something went wrong",
		});
	}
};
module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser, searchUser };
