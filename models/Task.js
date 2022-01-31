const mongoose = require('mongoose');

// setting up the structure for all the documnets in the collection
// only the specified properties in our Schema will be passed on to the database, all the other properties will be ignored.
// Below is an example of Schema without any validation
// const TaskSchema = new mongoose.Schema({
//     name: String,
//     completed: Boolean
// })


// Schema with validation.
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing in the body'],
        trim: true,
        maxLength: [40, 'name cannot be more than 40 characters']
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})
module.exports = mongoose.model('Task', TaskSchema)