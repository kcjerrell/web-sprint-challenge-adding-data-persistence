// build your `Resource` model here
const db = require('../../data/dbConfig');

async function getAll() {
	const result = await db('resources');

	return result;
}

async function getById(resource_id) {
	const result = await db('resources').where({ resource_id }).first();

	return result;
}

async function insert(resource) {
	const [id] = await db('resources').insert(resource);
	return await getById(id);
}

module.exports = {
	getAll,
	getById,
	insert,
}
