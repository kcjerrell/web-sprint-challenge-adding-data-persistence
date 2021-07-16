// build your `/api/tasks` router here
const express = require('express')
const tasks = require('./model');
const projects = require('../project/model')

const router = express.Router()

/** @type {express.RequestHandler} */
const validateTask = async (req, res, next) => {
	const { task_description, task_notes, project_id } = req.body;

	if (!task_description || typeof task_description !== 'string' || task_description.length === 0) {
		res.status(400).json({ message: "task description is required" });
		return;
	}
	if (!project_id || typeof project_id !== 'number') {
		res.status(400).json({ message: "valid project_id is required" });
		return;
	}

	const project = await projects.getById(project_id);

	if (!project) {
		res.status(400).json({ message: "invalid project_id" });
	}

	req.task = {
		task_description,
		task_notes,
		project_id
	};

	next();
};


// [POST] /api/tasks
// {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}
router.post('/', validateTask, (req, res, next) => {
	tasks.insert(req.task)
		.then(
			result => {
				res.status(201).json(result);
			},
			err => next(err)
		);
});

// [GET] /api/tasks
// [{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]
router.get('/:id?', (req, res, next) => {
	const promise = req.params.id ? tasks.getById(req.params.id) : tasks.getAll();

	promise.then(result => {
		res.status(200).json(result || []);
	},
		err => next(err)
	)
});

module.exports = router;
