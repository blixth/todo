var express = require('express');
var router = express.Router();
var TodoService = require('../services/services.todo');

router.get('/', async function(req, res, next)
{
	const todos = await TodoService.retrieveAll();

	return res.json({ todos: todos });
});

router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		await TodoService.validate(body);
		const todo = await TodoService.create(body);

		return res.status(201).json({ todo: todo });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	const body = req.body;

	try
	{
		await TodoService.validate(body);
		const todo = await TodoService.update(body);

		return res.status(200).json({ todo: todo });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const todo = await TodoService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		return next(err);
	}
});

module.exports = router;