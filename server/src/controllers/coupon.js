const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async(req, res) => {
    const {name, discount, expired} = req.body
    if ( !name || !discount || expired) throw new Error('Missing inputs')
    const response = await Coupon.create({
        ...req.body,
        expired: Date.now() + +expired * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        createdCoupon: response ? response : 'Cannot create brand'
    })
})

const getCoupons = asyncHandler(async(req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        coupons: response ? response : 'Cannot get coupons'
    })
})

const updateCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing input')
    if ( req.body.expired ) req.body.expired = Date.now() + +req.body.expired * 24 * 60 * 60 * 1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Cannot update coupons'
    })
})

const deleteCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCoupon: response ? response : 'Cannot delete coupons'
    })
})

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}