import pino from "pino";
import dayjs from "dayjs";

/**
 * Utility logger function, console.log() blocks the thread and express is a single threaded application
 * So this is useful not to slow down the application
 */
export default pino({
	base: {pid: false},
	timestamp: () => `,"time":"${dayjs().format()}"`
}, pino.transport({target: 'pino-pretty', options: {colorize: true}}))

