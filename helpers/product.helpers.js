const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection

module.exports = {
    addProduct: async (products, callback) => {
        try {
            const db = await getDb();  
            const result = await db.collection('product').insertOne(products); 
            console.log("result:",result);
            // Call the callback with success
            callback(result.insertedId.toString());
        } catch (error) {
            callback(false);  
        }
    }
}
