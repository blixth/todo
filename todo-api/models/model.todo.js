class TodoModel {
    constructor(guid, description, expiration_date, created_date, is_completed) {
        this.guid = guid;
        this.description = description;
        this.expiration_date = expiration_date;
        this.created_date = created_date;
        this.is_completed = is_completed;
    }
}

module.exports = TodoModel;