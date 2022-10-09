export default class CustomException extends Error {

	constructor(message: string, readonly code: number) {
		super(message);
	}

}
