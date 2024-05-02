import { v4 as uuidv4 } from 'uuid';

import { render } from "../middleware/render.js";
import multer from "multer";
import fs from "fs";
import { upload } from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

export function addRoutes(app) {

    // const objRep = {
    //     tweetModel,
    //     db,
    //     uuidv4,
    //     search,
    // }

    app.get('/', render("index"));

    app.get('/registration', render("user/registration"));

    app.get('/forgotPassword', render("user/forgotPassword"));

    //not existing route handler
    app.use(function (req, res) {
        // res.status(404).send({ url: req.originalUrl + ' not found' });
        res.status(404).render('notfound/notfound')
    });

    //Express final error handler (catches errors which not handled in modules)
    app.use((err, req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            console.error('General error handler');
            console.error(err.stack);
        }
        res.status(500).send("Something broke");
    });
}