// var express = require('express');
// var router = express.Router();
import express from 'express';
import { findAllData,findById, createData } from '../models/models';
import { getCustomers, getCustomersById, addCustomer, updateCustomerDetails, deleteCustomerDetails, getRegisterPage, getLoginPage, getUpdatePage, getUpdatePageById, getAddCustomerPage, getCustomerToDelete, logout, registerUser, loginUser} from '../Controllers/controller';
import {isLoggedIn} from '../middleware/authMiddleware'
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.route('/')
//       .get(getCustomers)
//       .post(addCustomer)
//       .put(updateCustomerDetails);

// router.route('/:id')
//       .get(getCustomersById)
//       .put(updateCustomerDetails)
//       .delete(deleteCustomerDetails);


router.get('/', isLoggedIn, getCustomers)
router.get('/register', getRegisterPage)
router.get('/login', getLoginPage)
router.get('/customers/delete/:id', isLoggedIn, getCustomerToDelete)
router.get('/update/', isLoggedIn, getUpdatePage)
router.get('/update/:id', isLoggedIn, getUpdatePageById)
router.get('/logout', logout)
router.get('/add', isLoggedIn, getAddCustomerPage)

router.post('/add', isLoggedIn, addCustomer);
router.put('/update/', isLoggedIn, updateCustomerDetails);
router.post('/register', registerUser)

router.get('/:id', isLoggedIn, getCustomersById);
router.delete('/delete/:id', isLoggedIn,deleteCustomerDetails);


//@Register User
//@route POST /register
//@access Public
router.post('/login', loginUser)


export default router;
