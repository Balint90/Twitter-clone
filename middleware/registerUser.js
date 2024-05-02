export function registerUser(objRep) {
    const { userModel, tweetModel, db, uuidv4 } = objRep;
    return (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let errors = {};

        if (!name || name.length === 0) {
            errors.nameError = 'Név megadása kötelező!';
        }

        if (!email || email.length === 0) {
            errors.emailError = 'Az e-mail cím megadása kötelező!';
        } else if (!emailRegex.test(email)) {
            errors.emailError = 'Nem érvényes e-mail cím!';
        }

        if (!password || password.length === 0) {
            errors.passwordError = 'A jelszó megadása kötelező!';
        } else if (password !== confirmPassword) {
            errors.passwordError = 'A jelszavak nem egyeznek!';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).render('user/registration', { errors });
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
            errors.emailExists = "A megadott e-mail cím már regisztrálva van a rendszerben!";
            return res.render('user/registration', { errors })
        }
        // db.saveDatabase((err) => {
        //     return next(err);
        // })
        return next();
    }
}