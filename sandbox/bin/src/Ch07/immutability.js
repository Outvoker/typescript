"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Company {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
exports.Company = Company;
class Address {
    constructor(city, street) {
        this.city = city;
        this.street = street;
    }
}
exports.Address = Address;
class Street {
    constructor(num, name) {
        this.num = num;
        this.name = name;
    }
}
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
const newCompany = Object.assign({}, exports.company, { address: Object.assign({}, exports.company.address, { street: Object.assign({}, exports.company.address.street, { name: exports.company.address.street.name.toUpperCase() }) }) });
