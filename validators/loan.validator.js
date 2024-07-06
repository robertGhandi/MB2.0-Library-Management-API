const joi = require("joi");

const loanSchema = joi
	.object({
		bookTitle: joi.string().required(),
		email: joi.string().email().required(),
		loanDate: joi.date().required(),
		returned: joi.boolean(),
		returnDate: joi.date(),
		
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
	validateLoan: validator(loanSchema),
};
