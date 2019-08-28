class TodoModel {
  guid: string;
  description: string;
  expiration_date: Date;
  created_date: Date;
  is_completed: Boolean;

  constructor(
    guid: string,
    description: string,
    expiration_date: Date,
    created_date: Date,
    is_completed: Boolean
  ) {
    this.guid = guid;
    this.description = description;
    this.expiration_date = expiration_date;
    this.created_date = created_date;
    this.is_completed = is_completed;
  }
}

export default TodoModel;
