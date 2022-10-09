import {NextFunction, Request, Response} from "express";
import {ValidationError as SequelizeValidationError} from "sequelize";
import {ValidationError as YupValidationError} from "yup";
import {StatusCodes} from "../types/status-code";


/**
 * Global error handler for uncaught exceptions or asynchronous exceptions
 *
 * @param error
 * @param req
 * @param res
 * @param _
 */
export default function (error: any, req: Request, res: Response, _: NextFunction) {

	const body: {message?: string, errors?: {[key: string]: string}} = {};

	// get the status or error code, if not available then default to 500
	let statusCode = error.status || error.code || 500

	if (error instanceof SequelizeValidationError || error instanceof YupValidationError) {

		// if it is any type of Validation exception from Sequelize or Yup then use 400 BAD Request
		statusCode = StatusCodes.BAD
		body.errors = {};

		// return a key (field name) => value (error message) pair for the errors
		// yup and sequelize have the same key value pairs but in different properties

		(error instanceof SequelizeValidationError ? error.errors : error.inner)
			.forEach(({path, message}) => body.errors![path!] = message)

	} else {
		// if not a validation error then return the error message only
		body.message = error.message;
	}

	res.status(statusCode).json(body)

}
