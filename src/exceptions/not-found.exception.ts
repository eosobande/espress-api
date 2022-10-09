import CustomException from "./custom.exception";
import {StatusCodes} from "../types/status-code";

/**
 * 404 resource not found
 */
export default class NotFoundException extends CustomException {

	constructor() {
		super('Missing Resource', StatusCodes.NotFound);
	}

}
