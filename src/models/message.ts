import {DataTypes, ForeignKey, NonAttribute} from "sequelize";
import database from "../database";
import User from "./user";
import CustomModel from "./custom.model";


export default class Message extends CustomModel<Message, Message> {

	declare id: number | undefined;
	declare userId: ForeignKey<User['id']>;
	declare receiverId: ForeignKey<User['id']>;
	declare message: string;
	declare createdAt: Date | null;

	declare from?: NonAttribute<User>
	declare to?: NonAttribute<User>

	protected get hidden(): NonAttribute<(keyof Message)[]> {
		return ['receiverId', 'userId'];
	}

}

Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		receiverId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		message: {
			type: DataTypes.STRING(140),
			allowNull: false
		},
		createdAt: DataTypes.DATE,
	},
	{
		updatedAt: false,
		sequelize: database
	}
)
