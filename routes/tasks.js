const express = require('express');
const router = express.Router();

const { getALLTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')
    // router.route('/').get((req, res) => {
    //     res.send('all items')
    // });
router.route('/').get(getALLTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
module.exports = router;