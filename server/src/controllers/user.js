const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const sendMail = require('../util/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')

// const register = asyncHandler(async(req, res) => {
//     const {email, password, mobile, lastname, firstname} = req.body
//     if (!email || !password || !mobile || !lastname || !firstname) return res.status(400).json({
//         success: false,
//         mes: 'Missing inputs'
//     })
//     const user = await User.findOne({ email })
//     if ( user ) {
//         throw new Error("User has existed")
//     } else {
//         const newUser = await User.create(req.body)
//         return res.status(200).json({
//             success: newUser ? true : false,
//             mes: newUser ? 'Register is successfully. Please go login~' : 'Something went wrong'
//         })
//     }
// })

// const register = asyncHandler(async(req, res) => {
//     const {email, password, mobile, lastname, firstname} = req.body
//     if (!email || !password || !mobile || !lastname || !firstname) return res.status(400).json({
//         success: false,
//         mes: 'Missing inputs'
//     })
//     const user = await User.findOne({email})
//     if(user) {
//         throw new Error("User has existed")
//     } else {
//         const token = makeToken()
//         res.cookie('dataregister', {...req.body, token}, { httpOnly: true, maxAge: 15 * 60 * 1000 })
//         const html = `Xin vui lòng click vào link dưới đây để đăng ký. Link này sẽ hết hạn sau 15 phút. <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
    
//         const data = {
//             email,
//             html,
//             subject: 'Hoàn tất đăng ký tài khoản'
//         }
//         await sendMail(data)
//         return res.json({
//             success: true,
//             mes: 'Please check your email'
//         })
//     }
// })

const register = asyncHandler(async(req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if ( !email || !password || !firstname || !lastname || !mobile ) return {
        success : false,
        mes: 'Missing input'
    }
    const user = await User.findOne({ email })
    if ( user ) throw new Error('User has existed')
    else {
        const token = makeToken()
        const emailEdited = btoa(email) + '@' + token
        const newUser = await User.create({
            email: emailEdited,
            password,
            firstname,
            lastname,
            mobile
        })
        if ( newUser ) {
            const html = `<h2>Register code</h2><br /><blockquote>${token}</blockquote>`
            await sendMail({ email, html, subject: 'Confirm register account'})
        }
        setTimeout(async() => {
            await User.deleteOne({email: emailEdited})
        },[300000])
        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Please check your mail to active account' : 'Something went wrong'
        })

    }
})

const finalregister = asyncHandler(async(req, res) => {
    // const cookie = req.cookies
    const { token } = req.params
    // if (!cookie || cookie?.dataregister?.token !== token ) {
    //     res.clearCookie('dataregister')
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    // }
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`)})
    if ( notActivedEmail ) {
        notActivedEmail.email = atob(notActivedEmail.email.split('@')[0])
        notActivedEmail.save()
    }
    return res.json({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail ? 'Register is successfully, Please Login' : 'Something went wrong'
    })
    // const newUser = await User.create({
    //     email: cookie?.dataregister?.email,
    //     password: cookie?.dataregister?.password,
    //     mobile: cookie?.dataregister?.mobile,
    //     firstname: cookie?.dataregister?.firstname,
    //     lastname: cookie?.dataregister?.lastname,
    // })
    // res.clearCookie('dataregister')
    // if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    // else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    if ( !email || !password) return res.status(400).json({
        success: false,
        mes: "Missing inputs"
    })
    const response = await User.findOne({ email })
    if ( response && response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, response.role)
        const newRefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
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

const forgotPassword = asyncHandler( async(req, res) => {
    const { email } = req.body
    if ( !email ) throw new Error('email not found')
    const user = await User.findOne({ email })
    if (!user) throw new Error('user not exist')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để đổi mật khẩu. Link này sẽ hết hạn sau 15 phút. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Forgot password'
    }
    const rs = await sendMail(data)
    
    return res.status(200).json({
        success: rs.response?.includes('OK') ? true : false,
        mes: rs.response?.includes('OK') ? 'Check your email' : 'Email expired or wrong'
    })
})

const resetPassword = asyncHandler(async(req, res) => {
    const { password, token } = req.body
    if ( !password || !token ) throw new Error("Missing inputs")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpired: { $gt: Date.now() }})
    if ( !user ) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpired = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Updated" : "Something went wrong"
    })
})

const getUsers = asyncHandler(async(req, res) => {
    const response = await User.find()
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async(req, res) => {
    const { _id } = req.query
    if ( !_id) throw new Error("Missing input")
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `User with email ${response.email} deleted` : 'No user delete'
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if ( !_id || Object.keys(req.body).length === 0 ) throw new Error("Missing input")
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Something went wrong"
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateUserAddress = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address }}, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateCart = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color ) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user.cart.find(el => el.product.toString() === pid)
    if ( alreadyProduct ) {
        if(alreadyProduct.color === color) {
            const response = await User.updateOne({cart: {$elemMatch: alreadyProduct}},{$set: {"cart.$.quantity": quantity}}, {new: true})
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Some thing went wrong'
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Some thing went wrong'
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Some thing went wrong'
        })
    }
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserAddress,
    updateUserByAdmin,
    updateCart,
    finalregister
}