import {AnySchema, object, ref, string} from "yup";
import {ProvideAndConsume} from "../types/provider";
import AuthRequest from "../types/auth-request";


const schema: ProvideAndConsume<AnySchema, AuthRequest> = ({auth}) =>
	object({

		currentPassword: string()
			.test(
				currentPassword => // is current password correct?
					object({currentPassword: string().required('current password is required')})
						.validate({currentPassword})
						.then(_ =>
							object({
								/**
								 * current password is present, now let us compare it to see if it is indeed correct
								 * we use the currentPassword key so the validation error will have the correct path associated
								 * if we do the check with the object({}) format then we would get an empty path associated with the error
								 */
								currentPassword: string()
									.label('current password')
									.test(value => auth!.comparePassword(value))
							})
								.validate({currentPassword})
						)
						.catch(error => error)
			),

		password: string()
			.required('password is required')
			.min(8, 'password is too short - should be minimum of 8 characters'),

		passwordConfirmation: string()
			.required('password confirmation is required')
			.is([ref('password')], 'passwords must match')

	})

export default schema
