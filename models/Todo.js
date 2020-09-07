const {Schema, model} = require('mongoose') // подключение объект Schema и функцию model

const schema = new Schema({
    title : {
        type: String,
        require: true,
    },
    complete: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)
