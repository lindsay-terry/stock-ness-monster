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

module.exports = router;