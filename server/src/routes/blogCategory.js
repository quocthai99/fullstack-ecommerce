const router = require('express').Router()
const ctrls = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createBlogCategory)
router.get('/', ctrls.getBlogCategories)
router.delete('/:bcid', [verifyAccessToken, isAdmin], ctrls.deleteBlogCategory)
router.put('/:bcid', [verifyAccessToken, isAdmin], ctrls.updateBlogCategory)


module.exports = router