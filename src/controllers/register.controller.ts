import Controller from "../types/controller";
import User from "../models/user";
import controllerResponse from "./controller-response";


/**
 * Create a new user
 *
 * Request body has been validated at this point so data is safe to use without extra checks
 *
 * @param body
 * @param response
 * @param next
 */
const controller : Controller<User> =
	({body}, response, next) =>
		controllerResponse(response, [User.create(body), next], 'CREATED')


export default controller
