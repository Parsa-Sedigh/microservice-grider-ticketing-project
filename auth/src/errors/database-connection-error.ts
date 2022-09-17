import {CustomError} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connection to the database';

    constructor() {
        super('Error connection to the database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ];
    }
}