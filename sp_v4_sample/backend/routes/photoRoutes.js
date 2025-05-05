var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');
var commentController = require('../controllers/commentController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', photoController.list);
//router.get('/publish', requiresLogin, photoController.publish);
router.get('/:id', photoController.show);

router.post(
    '/', 
    requiresLogin, 
    upload.single('image'),
    (req, res, next) => {
        req.body.createdAt = new Date();
        next();
    },
    photoController.create);

router.put('/:id', photoController.update);

router.delete('/:id', photoController.remove);

// Dodaj endpoint za komentiranje
router.post('/:id/comments', requiresLogin, commentController.create);
router.get('/:id/comments', commentController.list);

router.post('/:id/vote', requiresLogin, photoController.vote);
module.exports = router;
