// build your `/api/tasks` router here
const express = require('express')

const router = express.Router()

// [POST] /api/tasks
// {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}

// [GET] /api/tasks
// [{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]


module.exports = router;
