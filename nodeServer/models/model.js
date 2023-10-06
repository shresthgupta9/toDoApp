const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema({
    text: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('toDo', toDoSchema);
