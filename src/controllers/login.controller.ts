import Controller from "../types/controller";
import User from "../models/user";
import controllerResponse from "./controller-response";
import AuthenticationException from "../exceptions/authentication.exception";
import {sign} from "jsonwebtoken";

/**
 * Login a user
 *
 * @param email
 * @param password
 * @param response
 * @param next
 */
const controller: Controller<{ email: string, password: string }> =
	({body: {email, password}}, response, next) => {

		// fetch user with email
		const data = User.findOne({where: {email}})
			.then(user => {
				if (user) {
					return user.comparePassword(password).then(valid => {
						// password is correct
						if (valid) {
							// create a new JWT token, with an object with the user's id as payload
							return {
								token: sign(
									{id: user.id},
									process.env.PRIVATE_KEY!, // private key for signing
									{expiresIn: process.env.TOKEN_EXPIRE}
								)
							}
						}
						// user with email & password combination not exist, throw auth exception
						throw new AuthenticationException()
					})
				}
				// user with email & password combination not exist, throw auth exception
				throw new AuthenticationException()
			})

		controllerResponse(response, [data, next])

	}


export default controller
