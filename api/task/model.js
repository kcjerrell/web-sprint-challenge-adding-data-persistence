// build your `Task` model here
const db = require('../../data/dbConfig');

// select tasks.* , projects.project_name, projects.project_description from tasks
// join projects on tasks.project_id = projects.project_id

async function getAll() {
	const result = await db('tasks')
		.leftJoin('projects', 'projects.project_id', 'tasks.project_id')
		.select('tasks.*', 'projects.project_name', 'projects.project_description');

	result.forEach(t => setCompleted(t));

	return result;
}

async function getById(task_id) {
	const result = await db('tasks').where({ task_id }).first();

	if (result)
		setCompleted(result);

	return result;
}

async function insert(task) {
	const [id] = await db('tasks').insert(task);

	return await getById(id);
}

function setCompleted(task) {
	task.task_completed = Boolean(task.task_completed);
}

module.exports = {
	getAll,
	getById,
	insert,
}
