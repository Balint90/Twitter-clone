import session from "express-session";

export const initSession = (app) => {
    app.use(session({
        "secret": "ffsdfsdfsd",
        "resave": false,
        "saveUninitialized": true
    }))
}