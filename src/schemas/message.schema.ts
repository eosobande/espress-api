import {AnySchema, boolean, object, string} from "yup";
import {ProvideAndConsume} from "../types/provider";
import AuthRequest from "../types/auth-request";
import User from "../models/user";


const schema: ProvideAndConsume<AnySchema, AuthRequest> = ({auth}) =>
	object({

		email: string()
			.test(
				async email => {

					await object({ // run the normal validation case
						email: string()
							.required('email is required')
							.email('email is invalid')
							.not([auth!.email], 'email is invalid - cannot send a message to yourself')
					}).validate({email})

					// now lets check if the recipient user exists using the email
					const user = await User.findOne({attributes: ['id'], where: {email}})

					/**
					 * we use the email key here so the validation error will have the correct path
					 * if we do the check with the object({}) format then we would get an empty path associated with the error
					 */
					await object({
						email: boolean().isTrue('email is invalid - user does not exist')
					}).validate({email: !!user}) // !! to get a boolean of object is not null

					return true

				}
			),

		message: string()
			.required('message is required')
			.max(140, 'message is too long - should be maximum of 140 characters'),

	})


export default schema
