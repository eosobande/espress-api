import {InferCreationAttributes, Model, NonAttribute} from "sequelize";
import {omit} from "lodash";


/**
 * Custom base model for some extra generic functionality
 */
export default abstract class CustomModel<TModelAttributes extends CustomModel = any, TCreationAttributes extends CustomModel = any>
	extends Model<InferCreationAttributes<TModelAttributes>, InferCreationAttributes<TCreationAttributes>> {

	/**
	 * We might want to hide some model properties (e.g. password, id, etc.) from being returned to the end use
	 * All those model property names to this array
	 * @protected
	 */
	protected get hidden(): NonAttribute<(keyof TModelAttributes)[]> {
		return []
	};

	/**
	 * Override to json to return the partial model with the hidden properties stripped using omit from lodash
	 */
	toJSON<T extends InferCreationAttributes<TModelAttributes>>(): Partial<T> {
		return omit(super.toJSON<T>(), this.hidden)
	}

}
