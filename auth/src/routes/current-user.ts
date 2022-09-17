import express from "express";
import jwt from "jsonwebtoken";
import {currentUser} from "../middlewares/current-user";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // don't need this anymore:
    // if (!req.session?.jwt) {
    //     return res.send({ currentUser: null });
    // }

    // try {
    //     const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    //     res.send({ currentUser: payload });
    // } catch (err) {
    //     res.send({ currentUser: null });
    // }

    res.send({ currentUser: req.currentUser || null }); // don't want to send undefined, so let's use: || null
});

export {router as currentUserRouter};