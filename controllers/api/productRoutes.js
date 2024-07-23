const router = require('express').Router();
const { Product } = require('../../models');

// The `/api/products` endpoint

// GET all products and associated tables
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    });

    const plainProducts = products.map(product => product.toJSON());

    res.render('products', { products: plainProducts });
    // res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET product by id and associated tables
router.get('/:id', async (req, res) => {
  try {
    const products = await Product.findByPk(req.params.id, {
    });

    if (!products) {
      res.status(404).json({ message: 'Product not found' });
      return;
    };

    res.render('products', { products });
    // res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;