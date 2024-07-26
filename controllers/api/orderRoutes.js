// const router = require('express').Router();
// const { Product } = require('../../models');

// // Check product availability
// router.post('/check-availability', async (req, res) => {
//   try {
//     const { product, quantity } = req.body;

//     // Query to find the product by name
//     const availableProduct = await Product.findOne({ where: { item_name: product } });

//     if (!availableProduct) {
//       return res.status(404).json({
//         available: false,
//         message: 'The product you are looking for is not available in the stock or check your spellings and try again.'
//       });
//     }

//     // Check if the requested quantity is available
//     if (quantity <= availableProduct.stock) {
//       return res.status(200).json({
//         available: true,
//         message: 'The product is available. Please proceed to make an order.'
//       });
//     } else {
//       return res.status(200).json({
//         available: false,
//         message: `The quantity you are looking for is more than what we have. We have only ${availableProduct.stock} of ${availableProduct.item_name}.`
//       });
//     }
//   } catch (error) {
//     console.error('Error checking product availability:', error);
//     res.status(500).json({
//       available: false,
//       message: 'Internal server error. Please try again later.'
//     });
//   }
// });

// module.exports = router;


const router = require('express').Router();
const Order = require('../../models/');
const Product = require('../../models/');

// Route to create an order
router.post('/create', async (req, res) => {
  try {
    const { content, customer_id } = req.body;

    // Find the product to check its stock
    const product = await Product.findOne({ where: { id: content } });

    if (product && product.stock > 0) {
      // Create a new order
      const newOrder = await Order.create({
        isFulfilled: false,
        content,
        customer_id
      });

      // Reduce the stock of the product
      await Product.update({ stock: product.stock - 1 }, { where: { id: content } });

      res.json(newOrder);
    } else {
      res.status(404).json({ message: 'Product not available or out of stock' });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;
