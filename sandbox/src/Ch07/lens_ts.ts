import { lens } from 'lens.ts'
import {Company,Address,Street,company} from "./immutability"

const companyL = lens<Company>()
const addressL = lens<Address>()
const streetL = lens<Street>()

companyL.address
    .compose(addressL.street)
    .compose(streetL.name)
    .set(x=>x.toUpperCase())
    (company)