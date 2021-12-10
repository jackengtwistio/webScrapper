const mongoose = require('mongoose')

const listsSchema = new mongoose.Schema({
    title:'String',
    url:'String', 
    upVote:Number
})
const Lists = mongoose.model('lists',listsSchema)
module.exports = Lists