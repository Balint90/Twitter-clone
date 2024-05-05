/**
 * tweet id??
 * @param {*} objRep 
 * @returns 
 */

export const getTweet = (objRep) => {
    const { userModel, tweetModel } = objRep;
    return (req, res, next) => {
        const tweet = tweetModel.findOne({
            id: req.params.tweetid,
        });

        if (!tweet) {
            return next(new Error('Tweet nem található!'));
        }

        res.locals.tweet = tweet;
        return next();
    }
}