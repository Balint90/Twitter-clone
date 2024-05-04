import Joi from "joi";

// const schema = Joi.object({
//     name: Joi.string().alphanum().min(3).required(),
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'hu', 'net'] } }),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,}$')),
//     confirmPassword: Joi.ref('password'),
// }).with('password', 'confirmPassword');

export const registerUser = (objRep) => {
    const { userModel, tweetModel, saveDB, uuidv4 } = objRep;
    return (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let formErrors = {};

        if (!name || name.length === 0) {
            formErrors.nameError = 'Név megadása kötelező!';
        }

        if (!email || email.length === 0) {
            formErrors.emailError = 'Az e-mail cím megadása kötelező!';
        } else if (!emailRegex.test(email)) {
            formErrors.emailError = 'Nem érvényes e-mail cím!';
        }

        if (!password || password.length === 0) {
            formErrors.passwordError = 'A jelszó megadása kötelező!';
        } else if (password !== confirmPassword) {
            formErrors.passwordError = 'A jelszavak nem egyeznek!';
        }

        if (Object.keys(formErrors).length > 0) {
            return res.status(400).render('user/registration', { formErrors });
        }

        const newUser = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            secret: false,
        }

        try {
            userModel.insert(newUser);
        }
        catch (err) {
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push("A megadott e-mail cím már regisztrálva van a rendszerben!");
            return res.render('user/registration', { ...res.locals, ...formErrors })
        }

        return saveDB(next);
    }
}