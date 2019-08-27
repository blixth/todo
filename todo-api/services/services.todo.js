const TodoModel = require('../models/model.todo');
let Validator = require('fastest-validator');
let uid = require('uid-safe');

let todos = [];
let isSeeded = false;
let todoValidator = new Validator();

const todoVSchema = {
		description: { type: "string", min: 1, max: 50},
    };
    
class TodoService {
    static create(data) {
		let todo = new TodoModel(uid.sync(18), data.description, data.expiration_date, new Date(), false);
		todos.push(todo);

		return todo;
	}

	static update(data) {
		let todo = todos.find(t => t.guid === guid);

		if (todo) {
			todo.description = data.description;
			todo.expiration_date = data.expiration_date;
			todo.is_completed = data.is_completed;
		}
		
		throw new Error('Unable to retrieve a todo by (guid:'+ guid +')');
	}
	
	static retrieveAll(){
		return todos.sort((a, b) => a.created_date > b.created_date);
	} 

    static retrieve(guid) {
		let todo = todos.find(t => t.guid === guid);

		if(todo)
		{
			return todo;
		}

		throw new Error('Unable to retrieve a todo by (guid:'+ guid +')');
	}
    
    static delete(guid) {
		let todo = todos.find(t => t.guid === guid);
		
		if(todo)
		{
			todos = todos.filter(t => t.guid !== guid);
		} else {
			throw new Error('Unable to retrieve a todo by (guid:'+ guid +')');
		}
	}

	static validate(data) {
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
	}
}

module.exports = TodoService;