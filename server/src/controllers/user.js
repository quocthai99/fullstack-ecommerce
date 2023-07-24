const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

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

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    if ( !email || !password) return res.status(400).json({
        success: false,
        mes: "Missing inputs"
    })
    const response = await User.findOne({ email })
    const accessToken = generateAccessToken(response._id, response.role)
    const refreshToken = generateRefreshToken(response._id)
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    if ( response && response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error('Invalid credentials!')
    }
})

const getCurrent = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? user : "User not found"
    })
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if ( !cookie && !cookie.refreshToken ) throw new Error('Refreshtoken not found')
    const rs = await jwt.verify(cookie.refreshToken, process.env.SECRET_KEY)
    const response = await user.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? generateAccessToken(response._id, response.role) : "RefreshToken not matched"
    })
})

const logout = asyncHandler(async (req, res ) => {
    const cookie = req.cookies
    if ( !cookie && !cookie.refreshToken ) throw new Error('Refreshtoken not found')
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: "Logout!"
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout
}