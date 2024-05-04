import loki from 'lokijs';

const db = new loki('twitter_clone.db');

export function initDatabase(callBack) {
    db.loadDatabase({}, err => {
        if (err) {
            return callBack(err);
        }
        let tweetModel = db.getCollection("tweets");
        if (tweetModel === null) {
            tweetModel = db.addCollection("tweets", ["id", "user_id"]);
        }
        let userModel = db.getCollection("users");
        if (userModel === null) {
            userModel = db.addCollection("users", {
                indices: ["id"],
                unique: ["email"],
            });
        }

        db.saveDatabase(err => {
            if (err) {
                return callBack(err);
            }

            //remove in production
            console.table(tweetModel.find());
            console.table(userModel.find());

            return callBack(undefined, {
                userModel, tweetModel, saveDB: (cb) => {
                    db.saveDatabase(cb);
                }
            });
        });
    });
}