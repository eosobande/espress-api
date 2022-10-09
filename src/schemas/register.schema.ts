import {object, ref, string} from "yup";


export default object({

	firstName: string()
		.required('first name is required')
		.matches(/^[a-zA-Z]*$/, 'first name must contain only letters'),

	lastName: string()
		.required('first name is required')
		.matches(/^[a-zA-Z]*$/, 'last name must contain only letters'),

	password: string()
		.required('password is required')
		.min(8, 'password is too short - should be minimum of 8 characters'),

	passwordConfirmation: string()
		.required('password confirmation is required')
		.is([ref('password')], 'passwords must match'),

	email: string()
		.required('email is required')
		.email('email is invalid')

})
