import {NextFunction, Request, Response} from "express";
import NotFoundException from "../exceptions/not-found.exception";


/**
 * Guest route middleware, if authorization is present in header then throw a 404 NotFoundException,
 * this route is not meant for auth users
 *
 * @param authorization
 * @param _
 * @param next
 */
export default (
	{headers: {authorization}}: Request,
	_: Response,
	next: NextFunction
) => authorization ? next(new NotFoundException()) : next()
