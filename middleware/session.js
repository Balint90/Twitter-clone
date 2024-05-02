import session from "express-session";
import crypto from "crypto";

export const initSession = (app) => {
    app.use(session({
        secret: crypto.randomBytes(64).toString('hex'),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    }))
}