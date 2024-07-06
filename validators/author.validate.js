const joi = require("joi");

const authorSchema = joi
	.object({
		fullName: joi.string().required(),
		gender: joi.string().required(),
		nationality: joi.string().required(),
		bookTitle: joi.array()
	})
	.options({ abortEarly: false });

const validator = (validationSchema) => (req, res, next) => {
	try {
		const result = validationSchema.validate(req.body);
		if (result.error) {
			return res.status(400).json({
				status: "error",
				message: "Validation error",
				data: result.error,
			});
		}

		req.body = result.value;

		next();
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: "Validation error",
			data: error,
		});
	}
};

module.exports = {
	validateAuthor: validator(authorSchema),
};
