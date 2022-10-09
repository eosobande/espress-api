import CustomException from "./custom.exception";
import {StatusCodes} from "../types/status-code";

/**
 * AuthenticationException (for invalid login details or expired token)
 */
export default class AuthenticationException extends CustomException {

	constructor() {
		super('Invalid login details', StatusCodes.Unauthorized);
	}

}
