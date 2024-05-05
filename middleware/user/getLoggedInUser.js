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
            // return next(new Error('User from session does not exists.'));
            return next();
        }
        res.locals.userid = user.id;
        return next();
    }
}