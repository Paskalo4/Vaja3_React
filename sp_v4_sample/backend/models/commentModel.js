const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    commentedBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    photoId: { type: Schema.Types.ObjectId, ref: 'photo', required: true },
    commentedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comment', commentSchema);