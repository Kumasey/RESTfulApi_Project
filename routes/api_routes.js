const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Welcome to restPractice!'
    });
});

const contactController = require('../controllers/contact.controller');

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


module.exports = router;