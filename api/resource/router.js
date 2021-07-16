// build your `/api/resources` router here
const express = require('express')

const router = express.Router()

// [POST] /api/resources
// {"resource_id":1,"resource_name":"foo","resource_description":null}

// [GET] /api/resources
// [{"resource_id":1,"resource_name":"foo","resource_description":null}]

module.exports = router;
