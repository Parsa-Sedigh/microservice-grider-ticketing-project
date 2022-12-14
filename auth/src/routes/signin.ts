import express, {Request, Response} from "express";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-req";
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {Password} from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
        validateRequest
    ],
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials'); // don't make this err msg specific
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials'); // don't make this err msg specific
        }
        console.log('hello');
        /* If we make it this far, our user should now login ,so we need to generate a JWT and send it back inside of the cookie: */
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    });

export {router as signinRouter};