"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
// var router = express.Router();
const express_1 = __importDefault(require("express"));
const controller_1 = require("../Controllers/controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
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
router.get('/', authMiddleware_1.isLoggedIn, controller_1.getCustomers);
router.get('/register', controller_1.getRegisterPage);
router.get('/login', controller_1.getLoginPage);
router.get('/customers/delete/:id', authMiddleware_1.isLoggedIn, controller_1.getCustomerToDelete);
router.get('/update/', authMiddleware_1.isLoggedIn, controller_1.getUpdatePage);
router.get('/update/:id', authMiddleware_1.isLoggedIn, controller_1.getUpdatePageById);
router.get('/logout', controller_1.logout);
router.get('/add', authMiddleware_1.isLoggedIn, controller_1.getAddCustomerPage);
router.post('/add', authMiddleware_1.isLoggedIn, controller_1.addCustomer);
router.put('/update/', authMiddleware_1.isLoggedIn, controller_1.updateCustomerDetails);
router.post('/register', controller_1.registerUser);
router.get('/:id', authMiddleware_1.isLoggedIn, controller_1.getCustomersById);
router.delete('/delete/:id', authMiddleware_1.isLoggedIn, controller_1.deleteCustomerDetails);
//@Register User
//@route POST /register
//@access Public
router.post('/login', controller_1.loginUser);
exports.default = router;
//# sourceMappingURL=users.js.map