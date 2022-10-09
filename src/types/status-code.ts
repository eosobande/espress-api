type StatusCode =
	'OK' | 'CREATED' | 'NoContent' | 'BAD' | 'Unauthorized' | 'NotFound'


export default StatusCode

export const StatusCodes: {[key in StatusCode]: number} = {
	'OK': 200,
	'CREATED': 201,
	'BAD': 400,
	NoContent: 204,
	Unauthorized: 401,
	NotFound: 404
} as const

