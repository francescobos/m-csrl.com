const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get ('/', homeController.homeIndex);
router.get ('/company-profile', homeController.company);
router.get ('/rast3-modello-012-triplo-rastrello-livellatore', homeController.rast3);
router.get ('/minimot-interratrice-di-sassi-vegetali', homeController.minimot);
router.get ('/interratrice-serie-l-interratrice-di-sassi-e-vegetali', homeController.seriel);
router.get ('/interratrice-serie-m-interratrice-di-sassi-e-vegetali', homeController.seriem);
router.get ('/greenpower-polivalente-serie-pm-e-ph', homeController.greenpower);
router.get ('/bovibedding-gestione-delle-lettiere-bovine', homeController.bovibedding);
router.get ('/contattaci', homeController.contatti);

router.post ('/invio-messaggio', homeController.invioModuloContatti);

module.exports = router;