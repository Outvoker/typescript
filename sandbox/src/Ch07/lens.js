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
var trace_1 = require("../common/trace");
var immutability_1 = require("./immutability");
var Lens = /** @class */ (function () {
    function Lens(get, set) {
        this.get = get;
        this.set = set;
    }
    Lens.prototype.compose = function (tu) {
        var st = this;
        return new Lens(function (s) { return tu.get(st.get(s)); }, function (u, s) { return st.set(tu.set(u, st.get(s)), s); });
    };
    Lens.prototype.map = function (f, s) {
        return this.set(f(this.get(s)), s);
    };
    return Lens;
}());
exports.Lens = Lens;
// const addressCityL = new Lens<Address,string>(
//     (s: Address):string => s.city,
//     ( t: string,s: Address) => ({
//         ...s,
//         city:t
//     })
// )
exports.lens = function (propName) {
    return new Lens(function (s) { return s[propName]; }, function (t, s) {
        var _a;
        return (__assign(__assign({}, s), (_a = {}, _a[propName] = t, _a)));
    });
};
var companyAddressL = exports.lens("address");
var companyNameL = exports.lens("name");
var addressCityL = exports.lens("city");
var addressStreetL = exports.lens("street");
var streetNameL = exports.lens("name");
//Address.city =''
var newCity = addressCityL.set('new city', immutability_1.company.address);
trace_1.trace(newCity);
// company.address.city = "new city"
//company.address.street.name = "new name"
var newCompany = companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .set('new name', immutability_1.company);
trace_1.trace(newCompany);
var upperStreet = companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .map(function (x) { return x.toUpperCase(); }, immutability_1.company);
trace_1.trace(upperStreet);
