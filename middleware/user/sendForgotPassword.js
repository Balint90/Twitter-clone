import { getListeningPort } from "../../service/getListeningPort.js";

export const sendForgotPassword = (objRep) => {
    const { userModel, uuidv4, saveDB, mailService } = objRep;

    return (req, res, next) => {
        if (typeof req.body.email === 'undefined') {
            return next();
        }

        const user = userModel.findOne({
            email: req.body.email.trim().toLowerCase(),
        });

        //ez a megoldás támadási felület???  
        //mert így megtudhatják a támadók, hogy nincs regisztálva ez a Mail
        //helyette lehetne azt írni, hogy e-mail kiküldve, hogy ne adjunk támadási felületet!
        if (!user) {
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push("Nincs ilyen e-mail regisztrálva!");
            return next();
        }

        user.secret = uuidv4();
        userModel.update(user);

        const protocol = req.protocol;
        const host = req.hostname;

        let baseUrl = `${protocol}://${host}${getListeningPort(req)}`;

        res.locals.passwordResetSuccess = mailService.sendMail(
            user.email,
            "Elfelejtett jelszó visszaállítása",
            `Használd ezt a linket: ${baseUrl}/newpassword/${user.id}/${user.secret}`
        )

        return saveDB(next);
    }
}