"use strict";
// var express = require('express');
// var router = express.Router();
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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const data = await findAllData();
        const token = req.cookies.token;
        res.render('index', { title: 'Home', token });
    });
});
//@Register User
//@route POST /register
//@access Public
// router.get('/:id', async function(req, res, next) {
//   const id = Number(req.params.id);
//   const data = await findById(id);
//   res.render('index', { title: 'Express' });
// });
// module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map