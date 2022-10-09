import {NextFunction, Request, Response} from "express";
import {AnySchema} from "yup";
import {ProvideAndConsume} from "../types/provider";
import AuthRequest from "../types/auth-request";

/**
 * Request body validator
 * Some schemas need some auth data so they are a ProvideAndConsume type,
 * pass in the auth user and they return the Schema
 *
 * @param schema
 */
export default (schema: AnySchema | ProvideAndConsume<AnySchema, AuthRequest>) =>
	(req: Request, res: Response, next: NextFunction) =>
		(schema instanceof Function ? schema(req) : schema)
			.validate(req.body, {abortEarly: false}) // abort early false so that we can get all errors (not just the first error)
			.then(_ => next())
			.catch(next)
