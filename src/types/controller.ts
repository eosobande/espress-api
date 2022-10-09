import {NextFunction, Response} from "express";
import AuthRequest from "./auth-request";

/**
 * Controller method type alias
 */
type Controller<Body = {}, Params extends {[key: string]: string} = {}, Query = {}> =
	(request: AuthRequest<Body, Params, Query>, response: Response, next: NextFunction) => void

export default Controller


/**
 * Types for controller methods for a resource controller with named methods for the request method types
 */
export type IndexController<Params extends {[key: string]: string} = {}, Query = {}> = { index: Controller<{}, Params, Query> }

export type StoreController<Body = {}> = { store: Controller<Body> }

export type UpdateController<Body = {}, Params extends {[key: string]: string} = {}> = { update: Controller<Body, Params> }

export type DestroyController<Params extends {[key: string]: string} = {}> = { destroy: Controller<{}, Params> }

export type ShowController<Params extends {[key: string]: string} = {}> = { show: Controller<{}, Params> }
