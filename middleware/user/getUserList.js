export const getUserList = (objRep) => {
    const { userModel } = objRep;
    return (req, res, next) => {
        if (!req.session) {
            return next();
        }
        const users = userModel.find();

        res.locals.users = users;
        return next();
    }
}