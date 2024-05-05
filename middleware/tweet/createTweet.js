export const createTweet = (objRep) => {
    const { userModel, tweetModel, saveDB, uuidv4 } = objRep;
    return (req, res, next) => {
        const newTweet = {
            id: uuidv4(),
            text: req.body.newtweet,
            user_id: req.session.userid,
            created_at: new Date(),
            deleted_at: null,
            modified_at: null,
        };

        tweetModel.insert(newTweet);

        return saveDB(next);
    }
}