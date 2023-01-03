const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'user'
    }],
}, {
    timestamps: true
})

module.exports = model('post', postSchema)