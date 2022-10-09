import {IndexController, UpdateController} from "../types/controller";
import User from "../models/user";
import controllerResponse from "./controller-response";

/**
 * Profile Controller
 */
const controller : IndexController & UpdateController<User> = {

	/**
	 * Show my profile details
	 *
	 * @param auth
	 * @param response
	 * @param next
	 */
	index: ({auth}, response) => controllerResponse(response, [auth]),

	/**
	 * Update profile details (email, first name, last name)
	 *
	 * Request body has been validated at this point so data is safe to use without extra checks
	 *
	 * @param auth
	 * @param body
	 * @param response
	 * @param next
	 */
	update: ({auth, body}, response, next) =>
		controllerResponse(response, [auth!.update(body), next])

} as const

export default controller
