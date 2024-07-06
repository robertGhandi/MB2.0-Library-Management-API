const joi = require("joi");

const bookSchema = joi
	.object({
		title: joi.string().required(),
		authorName: joi.string(),
		description: joi.string(),
		genres: joi.array(),
        publicationDate: joi.number().integer().required(),
		copiesAvailable: joi.number()
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
	validateBook: validator(bookSchema),
};
