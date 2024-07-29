const router = require('express').Router();
const { Customer } = require('../../models');

//post request to create new customer
router.post('/', async (req, res) => {
    const {company_name, account_manager_id } = req.body;
    try {
        const data = await Customer.create({
            company_name: company_name,
            account_manager_id: account_manager_id,
        });
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating customer', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});


//put route to update an existing customer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {company_name, account_manager_id } = req.body;

    try {
        const data = await Customer.update({
            company_name: company_name,
            account_manager_id: account_manager_id,
        },
        {
            where: { id: id },
        },
    );
    if (data) {
        const updatedCustomer = await Customer.findByPk(id);
        res.status(200).json(updatedCustomer);
    } else {
        res.status(404).json({error: 'Customer not found'});
    }
    } catch (error) {
        console.error('Error updating customer', error);
        res.status(500).json({error: 'Failed to update customer'});
    }
});


//DELETE route to delete existing customer
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCustomer = await Customer.destroy({
            where: { id: id },
        });

        if (!deletedCustomer) {
            res.status(404).json({ message: `No customer found with id ${id}` });
            return;
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;