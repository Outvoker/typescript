import { lens } from 'lens.ts'

export class Company {
    public constructor(
        readonly name: string, 
        readonly address: Address
    ) { }
}
export class Address {
    constructor(
        readonly city: string, 
        readonly street: Street
    ) { }
}
export class Street {
    constructor(
        readonly num: number, 
        readonly name: string
    ) { }
}

export const company: Company = {
    name: "Ali",
    address: 
        {
            city: "Hangzhou",
            street: {
                name: "wenyixilu",
                num: 300
            }
        }
}
// company.address.street.name 
//     = company.address.street.name.toLowerCase()

const newCompany : Company= {
    ...company,
    address:{
        ...company.address,
        street:{
            ...company.address.street,
            name:company.address.street.name.toUpperCase()
        }
    }
} 






