/**
 * Get All Tweets
 * @param {*} objRep 
 * @returns 
 */

export const getTweets = (objRep) => {
    const { userModel, tweetModel } = objRep;
    return (req, res, next) => {
        const tweets = tweetModel.chain().find({ deleted_at: null }).data();

        const tweetsWithOwners = tweets.map((tweet) => {
            const owner = userModel.findOne({ id: tweet.user_id });
            return {
                ...tweet,
                owner: {
                    id: owner.id,
                    name: owner.name
                }
            }
        });

        res.locals.tweets = tweetsWithOwners;
        return next();
    }
}