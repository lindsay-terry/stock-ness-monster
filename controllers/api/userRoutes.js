const router = require('express').Router();
const { User } = require('../../models');

//login route
router.post('/login', async (req, res) => {
    try {
        //compare db data with username from request body
        const userData = await User.findOne({ where: { username: req.body.username }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password.  Please try again.' });
            return;
        }
        //compare db data of password with password in req body
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password.  Please try again.' });
            return;
        }
        //save session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

//logout route
router.post('/logout', (req, res) => {
    //destroy current session if user is logged in 
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//new user route
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

//delete user route
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        const deletedUser = await User.destroy({
            where: { id: userId },
        });

        if (!deletedUser) {
            res.status(404).json({ message: `No user found with id ${userId}` });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user route
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch the user to be updated
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Update user data
        const updatedUser = await user.update({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        });

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;