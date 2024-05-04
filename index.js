import express from "express";
import 'dotenv/config';
import morgan from "morgan";
import { addRoutes } from "./route/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { initSession } from "./middleware/session.js";
import { checkLogin } from "./middleware/user/checkLogin.js"
import { initDatabase } from "./service/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT;

initDatabase((err, { userModel, tweetModel, saveDB }) => {
    if (err) {
        return console.err(err);
    }

    app.use(express.static(__dirname + '/public'));

    app.use(express.urlencoded({ extended: false }));

    initSession(app);

    // app.use(checkLogin(userModel));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan("combined"));
    }

    app.set('view engine', 'ejs');

    addRoutes(app, userModel, tweetModel, saveDB);

    app.listen(port, function () {
        console.log(`Running on port ${port}`);
    })
})
