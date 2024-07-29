const router = require('express').Router();
const { Product } = require('../../models/');

// Route to check product availability
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Query to find the product by name
    const availableProduct = await Product.findByPk(id);

    if (availableProduct) {
        res.status(200).json(availableProduct.stock);
    } else {
      res.status(404).json({ message: 'Error fetching product info' });
    }
  } catch (error) {
    console.error('Error checking product availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
