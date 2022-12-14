import express from 'express';
import 'express-async-errors';
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from 'cookie-session'

const app = express();
app.use(express.json());

app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: true
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    // this won't work inside an asynchronous route handler in order to automatically capture the error and send it to the error handler middleware:
    // throw new NotFoundError();

    // next(new NotFoundError());

    // by using express-async-errors package, this line will work again inside our async function:
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to Mongodb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    });
};

start();