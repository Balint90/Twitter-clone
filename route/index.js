import { v4 as uuidv4 } from 'uuid';

import { render } from "../middleware/render.js";
import { registerUser } from "../middleware/user/registration.js";
import { loginUser } from '../middleware/user/login.js';
import { redirectToHome } from '../middleware/redirectToHomePage.js';
import { mailService } from "../service/email.js";
import { sendForgotPassword } from '../middleware/user/sendForgotPassword.js';
import { getUserByPWDSecret } from '../middleware/user/getUserByPwdSecret.js';
import { logout } from '../middleware/user/logout.js';
import { auth } from "../middleware/user/auth.js";
import { modifyUser } from '../middleware/user/modifyUser.js';
import { getLoggedInUser } from '../middleware/user/getLoggedInUser.js';
import { getUserList } from '../middleware/user/getUserList.js';
import { getTweetsForUser } from '../middleware/tweet/getTweetsForUser.js';
import { createTweet } from '../middleware/tweet/createTweet.js';
import { getTweet } from '../middleware/tweet/getTweet.js';
import { getTweets } from '../middleware/tweet/getTweets.js';
import { updateTweet } from '../middleware/tweet/updateTweet.js';
import { deleteTweet } from '../middleware/tweet/deleteTweet.js';

export function addRoutes(app, userModel, tweetModel, saveDB) {

    const objRep = {
        userModel,
        tweetModel,
        saveDB,
        uuidv4,
        mailService,
    }

    //user routes
    app.get('/registration', render("user/registration", { errors: {} }));

    app.post('/registration', registerUser(objRep), redirectToHome);

    app.get('/login', render("user/login"));

    app.post('/login', loginUser(objRep), redirectToHome);

    app.post('/logout', logout(objRep), redirectToHome);

    app.get('/forgotpassword', render("user/forgotPassword"));

    app.post('/forgotpassword', sendForgotPassword(objRep), render("user/forgotPassword"));

    app.get('/newpassword/:userid/:secret', render("user/resetPassword"));

    app.post('/newpassword/:userid/:secret', getUserByPWDSecret(objRep), modifyUser(objRep, 'password'), render("user/resetPassword"));

    app.get('/userlist', getLoggedInUser(objRep), getUserList(objRep), render("user/userList"));

    app.get('/user/:userid', getLoggedInUser(objRep), getTweetsForUser(objRep), render("user/userTweets"));

    //tweet routes

    app.post('/newtweet', auth(objRep), getLoggedInUser(objRep), createTweet(objRep), redirectToHome);

    app.get('/edittweet/:tweetid', auth(objRep), getLoggedInUser(objRep), getTweet(objRep), render("tweet/editTweet"));

    app.post('/edittweet/:tweetid', auth(objRep), getLoggedInUser(objRep), getTweet(objRep), updateTweet(objRep), redirectToHome);

    app.post('/deletetweet/:tweetid', auth(objRep), getTweet(objRep), deleteTweet(objRep), redirectToHome);

    app.get('/', getTweets(objRep), getLoggedInUser(objRep), render("index"));
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
        res.status(500).send("Something broke");
    });
}