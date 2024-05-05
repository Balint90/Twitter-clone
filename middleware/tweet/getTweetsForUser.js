/**
 * Get All Tweets for specific user
 * @param {*} objRep 
 * @returns 
 */

export const getTweetsForUser = (objRep) => {
    const { userModel, tweetModel } = objRep;
    return (req, res, next) => {

        const user = userModel.findOne({ id: req.params.userid });

        if (!user) {
            return res.redirect('/userlist');
        }

        const userTweets = tweetModel.chain()
            .find({ user_id: req.params.userid, deleted_at: null })
            .data()
            .map((tweet) => {
                return {
                    ...tweet,
                    owner: {
                        id: user.id,
                        name: user.name
                    }
                }
            });

        res.locals.ownerName = user.name;
        res.locals.userTweets = userTweets;
        return next();
    }
}