var express = require('express');
var router = express.Router();
let ctrlAppeals = require('../controllers/appeals');
let ctrlAuth = require('../controllers/auth');

router.get('/appeals', ctrlAppeals.getAll);
router.get('/appeals/:id', ctrlAppeals.getOne);
router.post('/appeals', ctrlAppeals.create);
router.put('/appeals/:id', ctrlAppeals.update);
router.delete('/appeals/:id', ctrlAppeals.delete);

router.post('/signup', ctrlAuth.signup);
router.post('/login', ctrlAuth.login);
router.get('/logout/:login', ctrlAuth.logout);
router.delete('/selfremove/:login', ctrlAuth.selfremove);

module.exports = router;