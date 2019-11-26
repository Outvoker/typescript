"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Company = /** @class */ (function () {
    function Company(name, address) {
        this.name = name;
        this.address = address;
    }
    return Company;
}());
exports.Company = Company;
var Address = /** @class */ (function () {
    function Address(city, street) {
        this.city = city;
        this.street = street;
    }
    return Address;
}());
exports.Address = Address;
var Street = /** @class */ (function () {
    function Street(num, name) {
        this.num = num;
        this.name = name;
    }
    return Street;
}());
exports.Street = Street;
exports.company = {
    name: "Ali",
    address: {
        city: "Hangzhou",
        street: {
            name: "wenyixilu",
            num: 300
        }
    }
};
// company.address.street.name 
//     = company.address.street.name.toLowerCase()
var newCompany = __assign(__assign({}, exports.company), { address: __assign(__assign({}, exports.company.address), { street: __assign(__assign({}, exports.company.address.street), { name: exports.company.address.street.name.toUpperCase() }) }) });
