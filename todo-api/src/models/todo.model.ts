class TodoModel {
  guid: string;
  description: string;
  expiration_date: Date;
  created_date: Date;
  is_completed: Boolean;
  is_expired: Boolean;

  constructor(
    guid: string,
    description: string,
    expiration_date: Date,
    created_date: Date,
    is_completed: Boolean
  ) {
    this.guid = guid;
    this.description = description;

    this.created_date = created_date;
    this.is_completed = is_completed;

    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    expiration_date.setHours(0,0,0,0);
    this.expiration_date = expiration_date;

    this.is_expired = currentDate.getTime() > this.expiration_date.getTime();
  }
}

export default TodoModel;
