export class TodoModel {
    id: string;
    description: string;
    expiration_date: Date;

    constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}