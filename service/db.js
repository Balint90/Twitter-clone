import loki from 'lokijs';

const db = new loki('twitter_clone.db');

export function initDatabase(callBack) {
    db.loadDatabase({}, err => {
        if (err) {
            return callBack(err);
        }
        let userModel = db.getCollection("users");
        if (userModel === null) {
            userModel = db.addCollection("users");
        }

        db.saveDatabase(err => {
            callBack(err, { db, userModel });
        });
    });
}