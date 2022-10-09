import {DataTypes, InferAttributes, InstanceUpdateOptions, NonAttribute, Op} from "sequelize";
import database from "../database";
import bcrypt from "bcrypt";
import {HookReturn} from "sequelize/types/hooks";
import Message from "./message";
import CustomModel from "./custom.model";
import CustomException from "../exceptions/custom.exception";
import {StatusCodes} from "../types/status-code";


export default class User extends CustomModel<User, User> {

	declare id: number | undefined;
	declare firstName: string;
	declare lastName: string;
	declare email: string;
	declare password: string;
	declare createdAt: Date | null;
	declare updatedAt: Date | null;

	protected get hidden(): NonAttribute<(keyof User)[]> {
		return ['id', 'updatedAt', 'password'];
	}

	/**
	 * Compare a plaintext password to the hashed password
	 *
	 * Returns: A promise to be either resolved with the comparison result or rejected with an Error
	 * @param password
	 */
	async comparePassword(password?: string): Promise<boolean> {
		return bcrypt.compare(password || '', this.password).catch(_ => false)
	}

	/**
	 * Get messages sent by or sent to this user model instance
	 *
	 * @param email Optional email, if provided, filters the messages to the ones cent to or sent by the user owning that email
	 */
	async messages(email?: string): Promise<Message[]> {

		let user: User | null = null

		if (email) {
			user = await User.findOne({attributes: ['id'], where: {email}})
				.then(user => {
					if (!user) {
						throw new CustomException(`user with email ${email} does not exist`, StatusCodes.BAD)
					}
					return user
				})
		}

		return Message.findAll({
				where: {
					[Op.or]: [
						user ? {userId: this.id, receiverId: user.id} : {userId: this.id},
						user ? {userId: user.id, receiverId: this.id} : {receiverId: this.id}
					]
				},
				include: [ // include both sender and recipient user info (only first name, last name, email)
					{model: User, as: 'to', attributes: ['firstName', 'lastName', 'email']},
					{model: User, as: 'from', attributes: ['firstName', 'lastName', 'email']},
				]
			}
		)
	}

}


User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				name: 'email',
				msg: 'email is taken'
			}
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		indexes: [
			{
				unique: true,
				fields: ['email']
			}
		],
		sequelize: database,
		hooks: {
			/**
			 * Hash the user password before creating the record
			 * @param instance
			 */
			beforeCreate(instance: User): HookReturn {
				if (instance.password) {
					return bcrypt.hash(instance.password, Number(process.env.SALT_WORK_FACTOR!) /* salt */)
						.then(hash => {
							instance.password = hash
						})
				}
			},
			/**
			 * If password has been changed then hash it before updating the record
			 *
			 * @param instance
			 * @param fields includes the properties that have been changed
			 */
			beforeUpdate(instance: User, {fields}: InstanceUpdateOptions<InferAttributes<User>>): HookReturn {
				if (fields?.includes('password')) {
					return bcrypt.hash(instance.password, Number(process.env.SALT_WORK_FACTOR!) /* salt */)
						.then(hash => {
							instance.password = hash
						})
				}
			}
		}
	}
)


Message.belongsTo(User, {
	foreignKey: 'userId',
	as: 'from'
})

Message.belongsTo(User, {
	foreignKey: 'receiverId',
	as: 'to'
})
