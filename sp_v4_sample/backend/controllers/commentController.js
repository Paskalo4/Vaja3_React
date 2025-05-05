const CommentModel = require('../models/commentModel');

module.exports = {
    create: function(req, res) {
        // Nastavimo komentatorja in pripadajoč photoId
        const newComment = new CommentModel({
            text: req.body.comment,
            commentedBy: req.session.userId,
            photoId: req.params.id
        });
        
        newComment.save((err, comment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }
            return res.status(201).json(comment);
        });
    },
    // Nova metoda za pridobivanje komentarjev za dano sliko:
    list: function(req, res) {
        CommentModel.find({ photoId: req.params.id })
            .populate('commentedBy', 'username')
            .exec((err, comments) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comments.',
                        error: err
                    });
                }
                return res.json(comments);
            });
    }
};