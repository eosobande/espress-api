import {Express} from "express";
import guestMiddleware from "./middlewares/guest.middleware";
import validatorMiddleware from "./middlewares/validator.middleware";
import registerSchema from "./schemas/register.schema";
import loginController from "./controllers/login.controller";
import loginSchema from "./schemas/login.schema";
import authorizationMiddleware from "./middlewares/authorization.middleware";
import registerController from "./controllers/register.controller";
import updateProfileSchema from "./schemas/update-profile.schema";
import profileController from "./controllers/profile.controller";
import changePasswordSchema from "./schemas/change-password.schema";
import changePasswordController from "./controllers/change-password.controller";
import messageController from "./controllers/message.controller";
import messageSchema from "./schemas/message.schema";


export default function (app: Express) {

	/**
	 * Could not figure out how to make a group route with a middleware applied to all routes in the group
	 * So had to apply the middleware individually in each case
	 */

	// login
	app.post('/login', guestMiddleware, validatorMiddleware(loginSchema), loginController)

	// register
	app.post('/register', guestMiddleware, validatorMiddleware(registerSchema), registerController)

	// profile
	app.route('/profile')
		.get(authorizationMiddleware, profileController.index)
		.patch(authorizationMiddleware, validatorMiddleware(updateProfileSchema), profileController.update)

	// change password
	app.patch('/change_password', authorizationMiddleware, validatorMiddleware(changePasswordSchema), changePasswordController)

	// send messages
	app.post('/messages', authorizationMiddleware, validatorMiddleware(messageSchema), messageController.store)

	// list messages
	app.get('/messages/:email?', authorizationMiddleware, messageController.index)

}
