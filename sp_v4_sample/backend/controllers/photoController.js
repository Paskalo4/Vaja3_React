var PhotoModel = require('../models/photoModel.js');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
        .populate('postedBy', 'username')
        .exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            var data = [];
            data.photos = photos;
            console.log(photos);
            //return res.render('photo/list', data);
            return res.json(photos);
        });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate('postedBy', 'username')
            .exec(function(err, photo){
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        console.log("Request body:", req.body);
        var photo = new PhotoModel({
			name : req.body.name,
			path : "/images/"+req.file.filename,
			postedBy : req.session.userId,
			views : 0,
            likes: [], // Inicializiraj kot prazen seznam
            dislikes: [], // Inicializiraj kot prazen seznam
            createdAt: new Date(),
            description: req.body.description // Dodano polje za opis slike
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
			photo.path = req.body.path ? req.body.path : photo.path;
			photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
			photo.views = req.body.views ? req.body.views : photo.views;
			photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function(req, res){
        return res.render('photo/publish');
    },

    /**
     * photoController.vote()
     */

    vote: async function (req, res) {
        const { id } = req.params;
        const { voteType } = req.body;
        const userId = req.session.userId;

        try {
            const photo = await PhotoModel.findById(id);

            if (!photo) {
                return res.status(404).json({ message: "Photo not found" });
            }

            // Odstrani uporabnika iz obeh seznamov
            photo.likes = photo.likes.filter(user => user.toString() !== userId);
            photo.dislikes = photo.dislikes.filter(user => user.toString() !== userId);

            // Dodaj uporabnika v ustrezen seznam
            if (voteType === "like") {
                photo.likes.push(userId);
            } else if (voteType === "dislike") {
                photo.dislikes.push(userId);
            }

            await photo.save();
            return res.status(200).json(photo);
        } catch (err) {
            return res.status(500).json({ message: "Error voting on photo", error: err });
        }
    }
};
