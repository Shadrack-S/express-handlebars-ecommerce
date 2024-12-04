const { getDb } = require('../config/connection');  // Destructure getDb to fetch the database connection

module.exports = {
    addProduct: async (products, callback) => {
        try {
            const db = await getDb();  
            const result = await db.collection('product').insertOne(products); 
            // Call the callback with success
            callback(true);
            console.log('Product added successfully:', result);
        } catch (error) {
            console.error('Error adding product:', error);
            callback(false);  
        }
    }
}
