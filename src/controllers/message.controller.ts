import {IndexController, StoreController} from "../types/controller";
import controllerResponse from "./controller-response";
import Message from "../models/message";
import User from "../models/user";


/**
 * Message controller
 */
const controller:
	IndexController<{ email?: string }> &
	StoreController<{ email: string, message: string }> = {

	/**
	 * List all messages or messages from a particular user (using email) if provided
	 *
	 * @param auth
	 * @param email
	 * @param response
	 * @param next
	 */
	index: ({auth, params: {email}}, response, next) =>
		controllerResponse(response, [auth!.messages(email), next]),

	/**
	 * Send a new message to the recipient user's email provided
	 *
	 * Request body has been validated at this point so data is safe to use without extra checks
	 *
	 * @param auth
	 * @param email
	 * @param message
	 * @param response
	 * @param next
	 */
	store: ({auth, body: {email, message}}, response, next) => {

		const result = User.findOne({where: {email}, attributes: ['id']})
			.then(
				user => // user is never null because the email has been validated, the user always exist at this stage
					Message.create(
						{receiverId: user!.id, userId: auth!.id, message},
						{
							include: [
								{model: User, as: 'to', attributes: ['firstName', 'lastName', 'email']},
								{model: User, as: 'from', attributes: ['firstName', 'lastName', 'email']},
							]
						}
					)
			)

		controllerResponse(response, [result, next])

	}

} as const

export default controller
