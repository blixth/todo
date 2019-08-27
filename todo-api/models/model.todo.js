class TodoModel {
    constructor(uid, description, expiration_date) {
        this.uid = uid;
        this.description = description;
        this.expiration_date = expiration_date;
    }
}

module.exports = TodoModel;
