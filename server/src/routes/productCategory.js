const router = require('express').Router()
const ctrls = require('../controllers/productCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')


router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory)
router.get('/', ctrls.getCategories)
router.delete('/:pcid', [verifyAccessToken, isAdmin], ctrls.deleteCategory)
router.put('/:pcid', [verifyAccessToken, isAdmin], ctrls.updateCategory)


module.exports = router