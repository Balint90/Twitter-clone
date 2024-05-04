export const modifyUser = (objRep, whichField) => {
    const { userModel, saveDB } = objRep;
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }
        if (typeof req.body[whichField] === "undefined") {
            return next();
        }

        res.locals.user[whichField] = req.body[whichField];

        if (whichField === 'password') {
            res.locals.user.secret = false;
        }

        userModel.update(res.locals.user);

        res.locals.userSaveSuccess = true;
        return saveDB(next);
    }
}