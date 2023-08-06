const router = require('express').Router()
const ctrls = require('../controllers/coupon')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCoupon)
router.get('/', ctrls.getCoupons)
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.deleteCoupon)
router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.updateCoupon)


module.exports = router