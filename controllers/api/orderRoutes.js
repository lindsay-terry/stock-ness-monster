
const router = require('express').Router();
const {Order, Product, OrderProduct} = require('../../models/');



// Make order Route
// -------------------------------------------------------------------------------------
router.post('/make-order', async (req, res) => {
  try {
    const { company, productOrder, quantityOrder } = req.body;

    // Validate input data
    // --------------------
    if (!company || !productOrder || isNaN(quantityOrder) || quantityOrder <= 0) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Find the product to check its stock
    // ----------------------------------
    const product = await Product.findOne({ where: { id: productOrder } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantityOrder) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create a new order
    // ------------------
    const newOrder = await Order.create({
      company,
      isFulfilled: false,
    });

    // Link the order to the product
    // ------------------------------
    await OrderProduct.create({
      order_id: newOrder.id,
      product_id: productOrder,
      quantity: quantityOrder,
    });

    // Reduce the stock of the product
    // -----------------------------
    await Product.update(
      { stock: product.stock - quantityOrder },
      { where: { id: productOrder } }
    );

    res.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});


// ------------------------------------------------------------------------------------------------------------------------------------------------------------


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


//route to close an order
router.put('/:id', async (req, res) => {
 
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId, {
      include: [{
        model: Product,
        through: {
          model: OrderProduct,
          attributes: ['quantity', 'product_id']
        },
        attributes: ['id', 'stock']
      }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.isFulfilled = true;
    await order.save();

    // console.log('Order:', JSON.stringify(order, null, 2));
    // console.log('Products:', JSON.stringify(order.products, null, 2));
    // console.log('OrderProducts:', JSON.stringify(order.products.orderProduct, null, 2));

    // console.log('Found OrderProduct:', JSON.stringify(orderProduct, null, 2));

    for (const product of order.products) {
      const orderProduct = product.orderProduct;
      if (orderProduct) {
        const newStock = product.stock - orderProduct.quantity;
        // console.log(`Updating stock for product ID ${product.id}: Current stock = ${product.stock}, Quantity = ${orderProduct.quantity}, New stock = ${newStock}`);
        if (newStock < 0) {
          throw new Error(`Insufficient stock for product ID ${product.id}`);
        }
        await Product.update(
          { stock: newStock },
          { where: { id: product.id }}
        );
      }
    }
    res.status(200).json({ message: 'Order closed and stock updated successfully' });
  } catch (error) {
    console.error('Error clsoing order and updating stock', error);
    res.status(500).json({ error: 'Failed to close order and update stock'});
  }
});

module.exports = router;