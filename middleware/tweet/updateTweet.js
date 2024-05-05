export const updateTweet = (objRep) => {
    const { tweetModel, saveDB } = objRep;
    return (req, res, next) => {
        if (typeof req.body.edittweet !== 'undefined') {
            res.locals.tweet.text = req.body.edittweet;
            res.locals.tweet.modified_at = new Date();
        }

        tweetModel.update(res.locals.tweet);

        return saveDB(next);
    }
}