import {Sequelize} from "sequelize";
import log from "../log";

// Create sequelize instance
const sequelize = new Sequelize({dialect: 'sqlite', storage: 'src/database/db.sqlite'})

export default sequelize

/**
 * Connect to the sqlite db
 */
export function initializeDatabaseConnection() {
	sequelize.authenticate()
		.then(_ => {

			log.info('Database Connected!')

			// Sync all defined models to the DB
			sequelize.sync()
				.then(() => log.info('Sync complete'))
				.catch(error => log.error(error))

		})
		.catch(error => {
			log.error(error)
			process.exit(1)
		})
}


