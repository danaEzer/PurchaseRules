var express = require('express');
var router = express.Router();
var rulesController = require('../controllers/rules.controller.js');

/* GET rules listing. */
router.get('/', rulesController.gettingOperators);
// router.get('/', function(req, res, next) {
//   res.send('respond with a rules');
// });

router.post('/', rulesController.verifyPurchase);

module.exports = router;
