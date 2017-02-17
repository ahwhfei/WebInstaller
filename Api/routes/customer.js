/* API for customers */
var express = require('express');
var router = express.Router();

var customer = require('../model/customer');

/* GET all customers */
router.get('/:customer/customer/all', function(req, res, next) {
    customer.find()
        .populate('customers')
        .exec(function (err, customers) {
            if (err) return next(err);
            res.json(customers);
    });
});

/* GET customer detail according to id */
router.get('/:customer/customer/:id', function(req, res, next) {
    customer.find({id: req.params.id}, function (err, customer) {
        if (err) return next(err);
        res.json(customer);
    });
});

/* CREATE a new customer */
router.post('/:customer/customer', function(req, res, next) {
    customer.create(req.body, function (err, customer) {
		if (err) return next(err);
		res.send(customer);
	});
});

/* UPDATE a customer */
router.put('/:customer/customer/:id', function(req, res, next) {
    customer.findByIdAndUpdate(req.params.id, req.body, function (err, customer) {
        if (err) return next(err);
        res.send('Update successfully');
    });
});

/* DELETE a customer */
router.delete('/:customer/customer/:id', function(req, res, next) {
    customer.findByIdAndRemove(req.params.id, function (err, customer) {
        if (err) return next(err);
        res.send(customer);
    });
});

module.exports = router;
