const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection
const collection = require('../config/collections')
const bcrypt = require('bcrypt')

module.exports = {
    doSignup: (userData) => {
        return new Promise((resolve, reject)=>{
            
        })
        userData.Password = bcrypt.hash(userData.Password, 10)


    }
}