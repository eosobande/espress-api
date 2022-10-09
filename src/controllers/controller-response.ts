import {NextFunction, Response} from "express";
import StatusCode, {StatusCodes} from "../types/status-code";


const empty = [null, undefined, NaN, '']

/**
 * Utility function to change the status code to NoContent 204 when the returned data is null | empty
 * and send the response accordingly
 *
 * @param response
 * @param data
 * @param statusCode
 */
function send(response: Response, data: any, statusCode: StatusCode) {

	if (empty.includes(data)) {
		statusCode = 'NoContent'
	}

	response.status(StatusCodes[statusCode]).json(data)

}

/**
 * Type alias for response data to be returned from controllers
 *
 * If data is of promise type then the NextFunction object must also be provided,
 * so we can automatically catch any errors that occur asynchronously
 */
type ResponseData<T> = T extends Promise<any> ? [T, NextFunction] : [T]


/**
 * Utility function to be reused for returning data from a controller
 *
 * If the response is a Promise, we call then() and pass the data to the send() function
 * and pass any error to next() so the global error handler can handle it,
 * otherwise the data is passed to the send function directly
 *
 * @param response
 * @param data
 * @param next
 * @param status
 */
export default function <T>(response: Response, [data, next]: ResponseData<T>, status: StatusCode = 'OK') {

	data instanceof Promise ?
		data.then(value => send(response, value, status)).catch(next) :
		send(response, data, status)

}
