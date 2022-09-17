import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

        // this doesn't work if we didn't declare a currentUser property on Request interface (we cannot create arbitrary properties on an object):
        req.currentUser = payload;
    } catch (err) {}

    next();
};