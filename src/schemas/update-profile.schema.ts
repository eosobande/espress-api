import {object, string} from "yup";


export default object({

	firstName: string()
		.optional()
		.matches(/^[a-zA-Z0-9]*$/, 'first name must contain only letters'),

	lastName: string()
		.optional()
		.matches(/^[a-zA-Z0-9]*$/, 'last name must contain only letters'),

	email: string()
		.optional()
		.email('email is invalid')

})
