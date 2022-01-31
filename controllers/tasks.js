const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getALLTasks = asyncWrapper(async(req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task, count: task.length })
})


const createTask = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = async(req, res) => {
    try {
        const { id: taskID } = req.params
        const getById = await Task.findOne({ _id: taskID })
            // if number of characters in the ID equal to number of characters for the ID in the DB then following condition will exicute
        if (!getById) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }
        res.status(200).json({ getById })
            // No.of characters in the ID not equal to number of characters for the ID in the DB following catch block will be executed.    
    } catch (error) {
        res.status(500).json({ error })
    }
}



const deleteTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const deletetaskID = await Task.findOneAndDelete({ _id: taskID });
        if (!deletetaskID) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }
        res.status(200).json({ msg: "Deleted Sucessfully" })
    } catch (error) {
        res.status(500).json({ error })
    }
}


const updateTask = async(req, res) => {
    try {
        const { id: taskID } = req.params
        const updateById = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,

        });
        if (!updateById) {
            return res.status(404).json({ msg: `No task with id: ${taskID} found` })
        }
        res.status(200).json({ updateById })
    } catch (error) {
        res.status(500).json({ error })
    }

}



module.exports = {
    getALLTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}