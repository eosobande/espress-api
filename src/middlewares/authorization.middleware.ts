import {NextFunction, Response} from "express";
import AuthRequest from "../types/auth-request";
import {verify} from "jsonwebtoken";
import User from "../models/user";
import AuthenticationException from "../exceptions/authentication.exception";

/**
 * Authorization middleware to get the bearer token and logged in auth user
 *
 * @param req
 * @param res
 * @param next
 */
export default async function (req: AuthRequest,
															 res: Response,
															 next: NextFunction) {

	const bearer = req.headers.authorization?.split(' ')[1]

	try {

		const decoded = <{ id?: number }>verify(bearer!, process.env.PRIVATE_KEY!)

		req.auth = await User.findByPk(decoded.id!)!

	} catch (error) {

		// if anything goes wrong then the token is either expired or invalid, throw an AuthenticationException
		return next(new AuthenticationException())

	}

	return next();

}
