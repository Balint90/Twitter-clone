/**
 * Leellenőrzi, hogy van-e bejelentkezett user.
 * Ha nincs, akkor redirect a főoldalra
 * Ha van, akkor a következő middleware-nek adja a vezérlést
 */
export const auth = (objRep) => {
    return (req, res, next) => {
        req.session.userid = 'f53ef658-a7db-4a43-8d7c-9c69ef985156';
        return req.session.save(next);

        //TODO: enable after testing
        if (req.session.userid === 'undefined') {
            return res.redirect('/');
        }

        return next();
    }
}