export const auth = () => {
    return (req, res, next) => {
        if (!req.session.loggedIn) {
            console.log('nincs belepve');
            return res.redirect('/');
        }
        console.log("minden ok");
        return next();
    }
}