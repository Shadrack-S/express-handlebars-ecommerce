const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection
const collection = require('../config/collections')
module.exports = {
    addProduct: async (products, callback) => {
        try {
            const db = await getDb();
            const result = await db.collection('product').insertOne(products);
            callback(result.insertedId.toString());
        } catch (error) {
            callback(false);
        }
    },
    getAllProducts: async () => {
        try {
            const db = await getDb(); // Ensure you retrieve the connected database instance
            const products = await db.collection(collection.PRODUCT_COLLECTION).find().toArray();
            return products; // Return the products directly
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Throw the error to be handled by the calling function
        }
    }
    
}
