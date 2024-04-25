import { render } from "../middleware/render.js";
import multer from "multer";
import fs from "fs";
import { upload } from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";

export function addRoutes(app) {
    app.get('/', (req, res, next) => {
        next();
    }, render("index"));

    //not existing route handler
    app.use(function (req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' });
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