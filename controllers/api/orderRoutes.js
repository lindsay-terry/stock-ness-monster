const router = require('express').Router();
const {Order, Product, OrderProduct} = require('../../models/');



// Make order Route
// -------------------------------------------------------------------------------------
router.post('/make-order', async (req, res) => {
  try {
    const { company, productOrder, quantityOrder } = req.body;
    console.log({ 'company': JSON.stringify(company, null, 2)})
    console.log({ 'productOrder': JSON.stringify(productOrder, null, 2)})
    console.log({ 'quantityOrder': JSON.stringify(quantityOrder, null, 2)})

    // Validate input data
    // --------------------
    if (!company || !Array.isArray(productOrder) || !Array.isArray(quantityOrder) || productOrder.length !== quantityOrder.length) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Find the product to check its stock
    // ----------------------------------
    const products = [];
    for (const product_id of productOrder) {
      const product = await Product.findByPk(product_id);
      if (!products) {
        return res.status(404).json({ message: 'Product not found' });
      }
      products.push(product);
    } 

    // Create a new order
    // ------------------
    const newOrder = await Order.create({
      customer_id: company,
      isFulfilled: false,
    });

    // Link the order to the product
    // ------------------------------
    const orderProductEntries = [];
    for (let i =0; i < productOrder.length; i++) {
      const product_id = productOrder[i];
      const quantity = quantityOrder[i];

     const newOrderProduct = await OrderProduct.create({
        order_id: newOrder.id,
        product_id,
        quantity,
      });
      orderProductEntries.push(newOrderProduct);
    }

    res.status(200).json({order: newOrder, orderProduct: orderProductEntries});
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});


// ------------------------------------------------------------------------------------------------------------------------------------------------------------

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
 

    for (const product of order.products) {
      const orderProduct = product.orderProduct;
      if (orderProduct) {
        const newStock = product.stock - orderProduct.quantity;

        if (newStock < 0) {
          throw new Error(`Insufficient stock for product ID ${product.id}`);
        
        }
        await Product.update(
          { stock: newStock },
          { where: { id: product.id }}
        );
      }
    }
    await order.save();
    res.status(200).json({ message: 'Order closed and stock updated successfully' });
  } catch (error) {
    console.error('Error closing order and updating stock', error);
    res.status(500).json({ error: 'Failed to close order and update stock'});
  }
});

module.exports = router;