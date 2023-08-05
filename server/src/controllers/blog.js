const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async(req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category ) throw new Error('Missing input')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Cannot create blog'
    })
})

const updateBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params
    if ( Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Cannot update blog'
    })
})

const getBlogs = asyncHandler(async(req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        getBlogs: response ? response : 'Cannot get blogs'
    })
})

const likeBlog = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Missing inputs")
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id )
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id }}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }

    const isLiked = blog?.likes?.find(el => el.toString() === _id )
    if ( isLiked ) {
        const response = await Blog.findOneAndUpdate(bid, { $pull: { likes: _id }}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id }}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

const dislikeBlog = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error("Missing inputs")
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id )
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }

    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id )
    if ( isDisliked ) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id }}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id }}, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

const getBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 }}, { new: true }).populate('likes', 'firstname lastname').populate('dislikes', 'firstname lastname')
    return res.status(200).json({
        success: blog ? true : false,
        rs: blog
    })
})

const deleteBlog = asyncHandler(async(req, res) => {
    const { bid } = req.params
    const response = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
        success: response ? true : false,
        deletedBlog: response ? response : 'Cannot delete blog'
    })
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMwYTM1MzFhYWY5MjhiMDZiNWVmYmMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyMTQzMDksImV4cCI6MTY5MTM4NzEwOX0.t7SgNqsVdrAsu9D9R3hk8w83PlVAyDQby5JhjVWUtSQ

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog
}