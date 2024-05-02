export function registerUser(objRep) {
    const { userModel, db, uuidv4 } = objRep;
    return (req, res, next) => {
        if (typeof req.body.name == 'undefined' || typeof req.body.email == 'undefined' || typeof req.body.password == 'undefined') {
            return response.status(400).json({ error: 'Missing data' });
        }

        const newUser = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        userModel.insert(newUser);
        db.saveDatabase((err) => {
            return next(err);
        })
    }
}