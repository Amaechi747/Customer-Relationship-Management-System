"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginUser = exports.registerUser = exports.getLoginPage = exports.getRegisterPage = exports.getCustomerToDelete = exports.getUpdatePageById = exports.getUpdatePage = exports.getAddCustomerPage = exports.deleteCustomerDetails = exports.updateCustomerDetails = exports.addCustomer = exports.getCustomersById = exports.getCustomers = void 0;
const utils_1 = require("../utils/utils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputValidator_1 = require("../models/inputValidator");
exports.getCustomers = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        const data = yield (0, models_1.findAllData)();
        res.status(200).render('showCustomers', { title: 'Customers', data, token, user });
    });
});
exports.getCustomersById = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const user = req.user;
        const data = yield (0, models_1.findById)(id);
        const token = req.cookies.token;
        res.status(200).render('getById', { title: "Customer", data, user: user === null || user === void 0 ? void 0 : user.fullname, token });
    });
});
exports.addCustomer = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const customerDetails = req.body;
        const data = yield (0, models_1.createData)(customerDetails);
        const allData = yield (0, models_1.findAllData)();
        const token = req.cookies.token;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.status(200).render('showCustomers', { title: 'Customers', data: allData, token, user });
    });
});
exports.updateCustomerDetails = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            res.status(400);
            throw new Error('No new data given');
        }
        const customerDetails = req.body;
        const token = req.cookies.token;
        const data = yield (0, models_1.updateData)(customerDetails);
        res.status(200).redirect('/users');
    });
});
exports.deleteCustomerDetails = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const data = yield (0, models_1.deleteData)(id);
        if (data === -1) {
            res.status(404);
            throw new Error('No customer which such id exists');
        }
        const token = req.cookies.token;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.status(200).render('showCustomers', { title: 'Customers', data, token, user });
    });
});
exports.getAddCustomerPage = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.status(201).render('addCustomer', { title: 'Add Customer', token: token, user });
    });
});
exports.getUpdatePage = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.status(201).render('update', { title: 'Update', token: token, user });
    });
});
exports.getUpdatePageById = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.path.split('/')[2];
        const token = req.cookies.token;
        if (!token) {
            res.status(401).render('login');
        }
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.status(201).render('updateById', { title: 'Update', token: token, id: id, user });
    });
});
exports.getCustomerToDelete = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqPath = req.path;
        const user = req.user;
        const customerId = reqPath.split('/')[3];
        const token = req.cookies.token;
        res.status(201).render('deleteCustomer', { title: 'Delete Customer Records', token, id: customerId, user: user === null || user === void 0 ? void 0 : user.fullname });
    });
});
/*******************************************Authentication and Authorization************************************/
exports.getRegisterPage = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.render('register', { title: "Register", token, user });
    });
});
exports.getLoginPage = (0, express_async_handler_1.default)(function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.fullname;
        res.render('login', { title: "Login", token, user });
    });
});
exports.registerUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, confirmPassword, access_token } = req.body;
        const valid = yield (0, inputValidator_1.validateUser)(name, email, password, confirmPassword, access_token);
        if (valid) {
            if (!name || !email || !password) {
                res.status(400);
                // err.status()
                throw new Error('Please add all fields');
            }
            // Check if User email exists
            const allData = (0, utils_1.fetchUsersData)();
            const userExists = allData.find((data) => data.email === email);
            if (userExists) {
                res.status(400);
                throw new Error('A user already exists with same email');
            }
            // Hash Password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Create id
            const userId = (0, uuid_1.v4)();
            const newUser = yield (0, models_1.createNewUser)(userId, name, email, hashedPassword);
            const userData = yield (0, utils_1.fetchUsersData)();
            if (!newUser) {
                res.status(400);
                throw new Error('Invalid user data');
            }
            // Store cookies
            const token = generateToken(newUser.id);
            res.cookie('token', token);
            res.status(201).redirect('/users');
            (0, utils_1.writeUsersData)(newUser, userData);
        }
    });
});
exports.loginUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, repeat_password } = req.body;
        const valid = yield (0, inputValidator_1.validateUserLoginDetails)(email, password, repeat_password);
        if (valid) {
            const allData = yield (0, utils_1.fetchUsersData)();
            const user = allData.find((user) => user.email === email);
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                //Store cookies 
                const token = generateToken(user.id);
                res.cookie('token', token);
                res.status(201).redirect('/users');
            }
            else {
                res.status(400);
                throw new Error('Invalid password or email');
            }
        }
    });
});
exports.logout = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie('token', '');
        req.cookies.token = '';
        // res.cookie(req.cookies.token, '') 
        res.status(200).redirect('/');
    });
});
// Generate Token
const generateToken = function (id) {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    }
};
/*****************************************************************The End******************************************************************/
//# sourceMappingURL=controller.js.map