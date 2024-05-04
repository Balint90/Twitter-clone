export const getLoggedInUser = (objRep) => {
    const { userModel } = objRep;
    return (req, res, next) => {
        if (!req.session) {
            return next();
        }
        const user = userModel.findOne({
            id: req.session.userid,
        });
        if (!user) {
            res.locals.loggedin = false;
            // return next(new Error('User from session does not exists.'));
            return next();
        }

        res.locals.loggedin = true;
        res.locals.user = user;
        return next();
    }
}