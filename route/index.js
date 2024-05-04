import { v4 as uuidv4 } from 'uuid';

import { render } from "../middleware/render.js";
import { registerUser } from "../middleware/user/registration.js";
import { loginUser } from '../middleware/user/login.js';
import { mailService } from "../service/email.js";
import { sendForgotPassword } from '../middleware/user/sendForgotPassword.js';
import { getUserByPWDSecret } from '../middleware/user/getUserByPwdSecret.js';
import { logout } from '../middleware/user/logout.js';
import { auth } from "../middleware/user/auth.js";
import { modifyUser } from '../middleware/user/modifyUser.js';
import { getLoggedInUser } from '../middleware/user/getLoggedInUser.js';

export function addRoutes(app, userModel, tweetModel, saveDB) {

    const objRep = {
        userModel,
        tweetModel,
        saveDB,
        uuidv4,
        mailService,
    }

    app.get('/registration', render("user/registration", { errors: {} }));

    app.post('/registration', registerUser(objRep), render("index"));

    app.get('/login', render("user/login"));

    app.post('/login', loginUser(objRep));

    app.post('/logout', logout(objRep), getLoggedInUser(objRep), render("index"));

    app.get('/forgotpassword', render("user/forgotPassword"));

    app.post('/forgotpassword', sendForgotPassword(objRep), render("user/forgotPassword"));

    app.get('/newpassword/:userid/:secret', render("user/resetPassword"));

    app.post('/newpassword/:userid/:secret', getUserByPWDSecret(objRep), modifyUser(objRep, 'password'), render("user/resetPassword"));

    app.get('/', getLoggedInUser(objRep), render("index"));
    //not existing route handler <--> 404
    app.use(function (req, res) {
        res.status(404).render('notfound/notfound')
    });

    //Express final error handler (catches errors which not handled in modules)
    app.use((err, req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            console.error('General error handler');
            console.error(err.stack);
        }
        console.log("Hiba: ", err);
        res.status(500).send("Something broke");
    });
}