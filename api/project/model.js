// build your `Project` model here
const db = require('../../data/dbConfig');

async function getAll() {
	const result = await db('projects');

	result.forEach(p => setCompleted(p));

	return result;
}

async function getById(project_id) {
	const result = await db('projects').where({project_id}).first();

	setCompleted(result);

	return result;
}

async function insert(project) {
	const [id] = await db('projects').insert(project);
	return await getById(id);
}

function setCompleted(project) {
	project.project_completed = Boolean(project.project_completed);
}

module.exports = {
	getAll,
	getById,
	insert,
}
