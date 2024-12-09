const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection
const collection = require('../config/collections')
const bcrypt = require('bcrypt');

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const db = await getDb();
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            const db = await getDb();
            let user = await db.collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
            if (user) {
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        loginStatus = status
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        loginStatus = status
                        resolve({ status: false })
                    }
                })
            } else {
                loginStatus = false
                resolve({ status: false })
            }
        })
    }
}