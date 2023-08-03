const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')


router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct)      
router.put('/ratings', [verifyAccessToken], ctrls.ratings)      
router.get('/:uid', ctrls.getProduct)      
router.get('/', ctrls.getProducts)    
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateProduct)  
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)  


module.exports = router