import {object, string} from "yup";

export default object({

	email: string()
		.required('email is required')
		.email('email is invalid'),

	password: string().required("password is required")

})
