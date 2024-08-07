const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get ('/', homeController.homeIndex);
router.get ('/company-profile', homeController.company);
router.get ('/rast3-model-012-triple-levelling-rake', homeController.rast3);
router.get ('/minimot-stones-and-plants-burier', homeController.minimot);
router.get ('/buriers-series-l-stone-and-plants-burier', homeController.seriel);
router.get ('/buriers-series-m-stone-and-plants-burier', homeController.seriem);
router.get ('/greenpower-multi-purpose-buriers-series-pm-and-ph', homeController.greenpower);
router.get ('/bovibedding-management-cattle-litter', homeController.bovibedding);
router.get ('/contact-us', homeController.contatti);

router.post ('/invio-messaggio', homeController.invioModuloContatti);

module.exports = router;