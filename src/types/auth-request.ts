import {Request} from "express";
import User from "../models/user";

/**
 * Add optional auth property to the Request type
 *
 * Provide type overrides for the Body and Param properties on the Request object
 */
type AuthRequest<Body = {}, Params extends {[key: string]: string} = {}, Query = {}> = Request<Params, any, Body, Query> & { auth?: User | null }

export default AuthRequest

