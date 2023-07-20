const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const register = asyncHandler(async(req, res) => {
    const {email, password, mobile, lastname, firstname} = req.body
    if (!email || !password || !mobile || !lastname || !firstname) return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })
    const user = await User.findOne({ email })
    if ( user ) {
        throw new Error("User has existed")
    } else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please go login~' : 'Something went wrong'
        })
    }
})

module.exports = {
    register
}