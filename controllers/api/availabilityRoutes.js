const router = require('express').Router();
const { Product } = require('../../models/');

// Route to check product availability
router.post('/check-availability', async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Query to find the product by name
    const availableProduct = await Product.findOne({ where: { item_name: product } });

    if (availableProduct) {
      // Check if the requested quantity is available
      const isAvailable = availableProduct.stock >= quantity;
      res.json({ available: isAvailable, message: isAvailable ? '' : 'Not enough stock available.' });
    } else {
      res.status(404).json({ available: false, message: 'Product not found.' });
    }
  } catch (error) {
    console.error('Error checking product availability:', error);
    res.status(500).json({ available: false, message: 'Server error' });
  }
});

module.exports = router;
