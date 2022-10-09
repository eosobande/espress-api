import dotenv from 'dotenv';
import express from 'express';
import log from "./log";
import routes from "./routes";
import {initializeDatabaseConnection} from "./database";
import uncaughtErrorHandlerMiddleware from "./middlewares/uncaught-error-handler.middleware";

// initialize configuration
dotenv.config();

const {SERVER_PORT, SERVER_HOST} = process.env;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.listen(Number(SERVER_PORT), SERVER_HOST!, () => {

	log.info(`Server listening at http://${SERVER_HOST}:${SERVER_PORT}`)

	// connect to db
	initializeDatabaseConnection()

	// init routes
	routes(app)

	// add global error handler
	app.use(uncaughtErrorHandlerMiddleware);

})
