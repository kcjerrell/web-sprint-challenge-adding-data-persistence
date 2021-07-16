// build your `/api/projects` router here
const express = require('express');
const projects = require('./model');

const router = express.Router()

/** @type {express.RequestHandler} */
const validateProject = (req, res, next) => {
	const { project_name, project_description, project_completed } = req.body;

	if (!project_name || typeof project_name !== 'string' || project_name.length === 0) {
		res.status(400).json({ message: "project name is required" });
		return;
	}

	req.project = {
		project_name,
		project_description: project_description,
		project_completed: Boolean(project_completed)
	};

	next();
};

// [GET] /api/projects
// [{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
router.get('/:id?', (req, res, next) => {
	const promise = req.params.id ? projects.getById(req.params.id) : projects.getAll();

	promise.then(result => {
		if (result) {
			res.status(200).json(result);
		}
		else
			res.status(404).json({ message: "could not find" });
	},
		err => next(err)
	)
});


// [POST] /api/projects
// {"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}
router.post('/', validateProject, (req, res, next) => {
	projects.insert(req.project)
		.then(
			result => {
				res.status(201).json(result);
			},
			err => next(err)
		);
});


module.exports = router;
