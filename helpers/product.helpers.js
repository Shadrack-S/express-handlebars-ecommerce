const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection
const { ObjectId } = require('mongodb');
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
    },
    getAProduct: async (productId) => {
        try {
            const db = await getDb(); // Ensure you have a working `getDb` function
            const product = await db.collection(collection.PRODUCT_COLLECTION).findOne({ _id: new ObjectId(productId) });

            if (!product) {
                console.log('Product not found');
                return null;
            }
            return product;
        } catch (error) {
            throw error;
        }
    },
    deleteAProduct: async (productId) => {
        try {
            const db = await getDb();
            const result = await db.collection(collection.PRODUCT_COLLECTION).findOneAndDelete({ _id: new ObjectId(productId) })
            return result
        } catch (error) {
            throw error;
        }
    },


}
