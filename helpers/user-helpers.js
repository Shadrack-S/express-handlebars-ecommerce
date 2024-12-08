const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection
const collection = require('../config/collections')
const bcrypt = require('bcrypt')

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const db = await getDb();
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })


    }
}