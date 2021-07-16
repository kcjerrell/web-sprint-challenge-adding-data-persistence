// build your `/api/resources` router here
const express = require('express');
const resources = require('./model');

const router = express.Router()

/** @type {express.RequestHandler} */
const validateResource = (req, res, next) => {
	const { resource_name, resource_description } = req.body;

	if (!resource_name || typeof resource_name !== 'string' || resource_name.length === 0) {
		res.status(400).json({ message: "resource name is required" });
		return;
	}

	req.resource = {
		resource_name,
		resource_description: resource_description,
	};

	next();
};


// [GET] /api/resources
// [{"resource_id":1,"resource_name":"foo","resource_description":null}]
router.get('/:id?', (req, res, next) => {
	const promise = req.params.id ? resources.getById(req.params.id) : resources.getAll();

	promise.then(result => {
		res.status(200).json(result || []);
	},
	err => next(err)
	)
});


// [POST] /api/resources
// {"resource_id":1,"resource_name":"foo","resource_description":null}
router.post('/', validateResource, (req, res, next) => {
	resources.insert(req.resource)
		.then(
			result => {
				res.status(201).json(result);
			},
			err => next(err)
		);
});


module.exports = router;
