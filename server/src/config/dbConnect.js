const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if ( conn.connection.readyState === 1 ) {
            console.log('connect db is successfully')
        } else {
            console.log('db connecting')
        }
    } catch (error) {
        console.log('connect is failed')
        throw new Error(error)
    }
}

module.exports = dbConnect