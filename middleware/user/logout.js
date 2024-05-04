export const logout = (objRep) => {
    return (req, res, next) => {
        req.session.destroy(err => {
            if (err) {
                return next(err);
            }

            return next();
        });
    }
}