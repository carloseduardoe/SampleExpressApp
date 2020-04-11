'use strict';

const router = require('express').Router();
const userRoutes = require('./routes/userRoutes');

// Integrates the user routes
router.use('/users', userRoutes);

module.exports = router;