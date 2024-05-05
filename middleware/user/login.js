/**
 * Bejelentkezteti a usert és a res.locals.user-re rakja a bejelentkezett usert, 
 * ha sikerült a bejelentkezés
 * Ha nem sikerül, akkor a res.locals.errors-ba rak egy hibaüzenetet, amit az FE megjeleníthet
 * @param {object} objRep 
 * @returns 
 */

export const loginUser = (objRep) => {
    const { userModel } = objRep;

    return (req, res, next) => {
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined') {
            return next();
        }

        const user = userModel.findOne({
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password
        });

        if (!user) {
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push("Hibás e-mail vagy jelszó!");
            res.redirect("/login");
        }

        req.session.userid = user.id;
        return req.session.save(err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    }
}