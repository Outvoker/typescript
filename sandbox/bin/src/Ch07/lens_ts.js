"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lens_ts_1 = require("lens.ts");
const immutability_1 = require("./immutability");
const companyL = lens_ts_1.lens();
const addressL = lens_ts_1.lens();
const streetL = lens_ts_1.lens();
companyL.address
    .compose(addressL.street)
    .compose(streetL.name)
    .set(x => x.toUpperCase())(immutability_1.company);
