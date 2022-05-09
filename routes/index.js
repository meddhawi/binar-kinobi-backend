var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController')
const restrict = require('../middlewares/restrict')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', api.login)
router.post('/register', api.register)

router.put('/products/:id', restrict, api.dataUpdate)
router.post('/products', restrict, api.dataAdd)
router.get('/products', restrict, api.dataFindAll)
router.get('/products/:id', restrict, api.dataById)
router.delete('/products/:id', restrict, api.dataDelete)
module.exports = router;
