const TodoModel = require('../models/model.todo');
let Validator = require('fastest-validator');
let todos = {};
let counter = 0;

let todoValidator = new Validator();

const todoVSchema = {
		guid: {type: "string", min: 3},
		description: { type: "string", min: 1, max: 50},
    };
    
class TodoService {
    static create(data) {
		var vres = todoValidator.validate(data, todoVSchema);
		
		if(!(vres === true))
		{
			let errors = {}, item;

			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

		let todo = new TodoModel(data.guid, data.description, data.expiration_date);

		todo.uid = 't' + counter++;

		todos[todo.uid] = todo;

		return todo;
	}
	
	static retrieveAll()
	{
		return todos;
	}

    static retrieve(uid)
	{
		if(todos[uid] != null)
		{
			return todos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a todo by (uid:'+ uid +')');
		}
    }
    
    static delete(uid)
	{
		if(todos[uid] != null)
		{
			delete todos[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
		}
	}
}

module.exports = TodoService;