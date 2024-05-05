//softdelete?
export const deleteTweet = (objRep) => {
    const { tweetModel, saveDB } = objRep;
    return (req, res, next) => {
        //softdelete:
        res.locals.tweet.deleted_at = new Date();
        tweetModel.update(res.locals.tweet);

        //hard_delete:
        //tweetModel.remove(response.locals.tweet);
        return saveDB(next);
    }
}