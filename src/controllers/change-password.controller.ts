import Controller from "../types/controller";
import controllerResponse from "./controller-response";

/**
 * Change user password
 *
 * request body has been validated at this point, so we can just update the password directly
 * a before update hook runs on the user model to hash the password
 *
 * A NoContent http status code is set if the update succeeds
 */
const controller: Controller<{ password: string }> =
	({auth, body: {password}}, response, next) => {
		controllerResponse(response, [auth!.update({password}), next], 'NoContent')
	}

export default controller
