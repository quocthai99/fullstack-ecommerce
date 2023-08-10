const User = require('../models/user')
const Order = require('../models/order')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    const total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    if(coupon) total = Math.round(total * (1-coupon/100) / 1000) * 1000
    const rs = await Order.create({products, total, orderBy: _id})
    return res.status(200).json({
        success: rs ? true : false,
        createdOrder: rs ? rs : 'Cannot create user cart'
    })
})

const updateStatus = asyncHandler(async(req,res) => {
    const { oid } = req.params
    const {status} = req.body
    if(!status) throw new Error('Missing status')
    const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})

const getUserOrder = asyncHandler(async(req,res) => {
    const {_id} = req.user
    const response = await Order.find({orderBy: _id})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})

const getOrders = asyncHandler(async(req,res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders,
    getOrders
}