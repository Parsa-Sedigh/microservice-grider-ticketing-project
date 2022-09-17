import {NextFunction, Request, Response} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";
import {CustomError} from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // if (err instanceof RequestValidationError) {
    //     // this knowledge of handling errors shouldn't be here:
    //     // const formattedErrors = err.errors.map(error => {
    //     //     return {message: error.msg, field: error.param};
    //     // });
    //
    //     // we use a return here to not execute this function anymore:
    //     return res.status(err.statusCode).send({errors: err.serializeErrors()});
    // }
    //
    // if (err instanceof DatabaseConnectionError) {
    //     // return res.status(500).send({
    //     //     errors: [{message: err.message}]
    //     // });
    //     return res.status(err.statusCode).send({errors: err.serializeErrors()});
    // }

    if (err instanceof CustomError) {

        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    });
};