export const getUserByPWDSecret = (objRep) => {
    const { userModel } = objRep;
    return (req, res, next) => {
        //:userid/:secret
        console.log("getuserbypwdsecret", req.params);
        const user = userModel.findOne({
            id: req.params.userid,
            secret: req.params.secret
        });

        if (!user) {
            res.redirect("/");
        }
        res.locals.user = user;
        return next();
    }
}