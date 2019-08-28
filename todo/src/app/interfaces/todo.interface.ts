export interface ITodo {
	guid: string;
	description: string;
	expiration_date: Date;
	created_date: Date;
	is_completed: Boolean;
	is_expired: Boolean;
}