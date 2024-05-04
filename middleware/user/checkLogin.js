/**
 * 
 * @param {*} userModel 
 * @returns 
 */

export const checkLogin = (userModel) => {
    return (req, res, next) => {
        if (req.session && req.session.userid) {
            // You might want to replace this with however you've implemented your users.
            // This example assumes you have a User model with a `find` method.
            userModel.find({ id: req.session.userid }, function (err, user) {
                if (user) {
                    req.user = user;
                    res.locals.loggedin = true;
                }
                return next();
            });
        } else {
            res.locals.loggedin = false;
            return next();
        }
    }
}