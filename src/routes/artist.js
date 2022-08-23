// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');

const router = express.Router();

router.post('/', artistController.create);

router.post("/:artistId/album", albumController.create);

router.get('/', artistController.read);

router.get('/:artistId', artistController.readById);

router.patch('/:artistId', artistController.update);

router.delete('/:artistId', artistController.delete);

module.exports = router;