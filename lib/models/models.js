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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.deleteData = exports.updateData = exports.createData = exports.findById = exports.findAllData = void 0;
const utils_1 = require("../utils/utils");
// import{newClient} from '../Controllers/controller';
const findAllData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, utils_1.fetchData)();
        return allData;
    });
};
exports.findAllData = findAllData;
const findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, utils_1.fetchData)().find((info) => info.id === id);
        return data;
    });
};
exports.findById = findById;
// let customerID = 0;
const createData = function (details) {
    return __awaiter(this, void 0, void 0, function* () {
        // const newCustomer = await newClient(details);
        // return newCustomer; 
        const allData = yield (0, utils_1.fetchData)();
        let lastIndex = allData.length;
        if (lastIndex == 0) {
            lastIndex = 1;
        }
        else if ((lastIndex !== 0)) {
            lastIndex = allData[lastIndex - 1].id + 1;
        }
        // const uniqueId = (allData[lastIndex].id !== undefined) && (lastIndex == allData[lastIndex].id) ? lastIndex + 1 : (lastIndex === -1) ? lastIndex + 2 : lastIndex;
        // console.log(`Bug:${uniqueId}found`);
        const { fullname, email, gender, phone, address, notes } = yield details;
        const customerID = lastIndex;
        const customer = {
            "id": customerID,
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "phone": phone,
            "address": address,
            "notes": notes || ' '
        };
        // console.log(customerID)
        // Add new customer to database
        (0, utils_1.writeData)(customer, allData);
        return customer;
    });
};
exports.createData = createData;
const updateData = function (update) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, utils_1.fetchData)();
        const { id, fullname, email, gender, phone, address, notes } = yield update;
        const index = allData.findIndex((data) => data.id == id);
        for (let data of allData) {
            if (data.id == id) {
                data['fullname'] = fullname || data.fullname;
                data['email'] = email || data.email;
                data['gender'] = gender || data.gender;
                data['phone'] = phone || data.phone;
                data['address'] = address || data.address;
                data['notes'] = notes || data.notes;
            }
        }
        (0, utils_1.writeUpdatedData)(allData);
        return allData;
    });
};
exports.updateData = updateData;
const deleteData = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, utils_1.fetchData)();
        const index = allData.findIndex((info) => info.id === id);
        if (index === -1) {
            return -1;
        }
        allData.splice(index, 1);
        // Rewrite the database
        (0, utils_1.writeUpdatedData)(allData);
        return allData;
    });
};
exports.deleteData = deleteData;
const createNewUser = function (id, name, email, password) {
    const newUser = {
        id: id,
        fullname: name,
        email: email,
        password: password
    };
    return newUser;
};
exports.createNewUser = createNewUser;
//# sourceMappingURL=models.js.map